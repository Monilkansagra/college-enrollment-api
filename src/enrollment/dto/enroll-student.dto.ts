import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollStudentDto {
  @ApiProperty({ example: 1, description: 'ID of the student' })
  @IsInt()
  @IsPositive()
  studentId: number;

  @ApiProperty({ example: 1, description: 'ID of the course' })
  @IsInt()
  @IsPositive()
  courseId: number;
}
