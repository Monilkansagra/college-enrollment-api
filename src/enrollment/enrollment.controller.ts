import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 201, description: 'Student successfully enrolled.' })
  @ApiResponse({ status: 400, description: 'Course not active or reached maximum capacity.' })
  @ApiResponse({ status: 404, description: 'Student or Course not found.' })
  @ApiResponse({ status: 409, description: 'Student already enrolled in this course.' })
  create(@Body() enrollStudentDto: EnrollStudentDto) {
    return this.enrollmentService.enroll(enrollStudentDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, description: 'List of all enrollment records.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get enrollments by student' })
  @ApiResponse({ status: 200, description: 'List of courses a student is enrolled in.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.enrollmentService.findByStudent(studentId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get enrollments by course' })
  @ApiResponse({ status: 200, description: 'List of students enrolled in a course.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.enrollmentService.findByCourse(courseId);
  }
}
