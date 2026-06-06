import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';
import { EnrollStudentDto } from './dto/enroll-student.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async enroll(enrollStudentDto: EnrollStudentDto): Promise<Enrollment> {
    const { studentId, courseId } = enrollStudentDto;

    // 1. Find student
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // 2. Find course
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3. Check if course is active
    if (!course.isActive) {
      throw new BadRequestException('Course is not active');
    }

    // 4. Duplicate check
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: { studentId, courseId },
    });
    if (existingEnrollment) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    // 5. Capacity check
    if (course.enrolledCount >= course.maxCapacity) {
      throw new BadRequestException('Course has reached maximum enrollment capacity');
    }

    // 6. Create new enrollment record
    const enrollment = this.enrollmentRepository.create({
      studentId,
      courseId,
    });
    const savedEnrollment = await this.enrollmentRepository.save(enrollment);

    // 7. Increment course enrolledCount
    course.enrolledCount += 1;
    await this.courseRepository.save(course);

    // 8. Return the saved enrollment with relations eagerly loaded
    // Need to explicitly find again to load relations properly based on eager loading setup
    return this.enrollmentRepository.findOne({ where: { id: savedEnrollment.id } }) as Promise<Enrollment>;
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find();
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return this.enrollmentRepository.find({ where: { studentId } });
  }

  async findByCourse(courseId: number): Promise<Enrollment[]> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.enrollmentRepository.find({ where: { courseId } });
  }
}
