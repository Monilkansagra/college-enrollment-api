import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Computer Science', description: 'The title of the course' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Learn the basics of programming.', description: 'The course description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Dr. Smith', description: 'The instructor of the course' })
  @IsString()
  @IsNotEmpty()
  instructor: string;

  @ApiProperty({ example: 30, description: 'Maximum capacity of the course' })
  @IsInt()
  @Min(1)
  maxCapacity: number;
}
