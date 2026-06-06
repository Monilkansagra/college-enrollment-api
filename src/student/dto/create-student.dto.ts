import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'John', description: 'First name of the student' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the student' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'student@college.com', description: 'Email of the student' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '1234567890', description: 'Phone number of the student' })
  @IsOptional()
  @IsString()
  @Length(10, 15)
  phone?: string;
}
