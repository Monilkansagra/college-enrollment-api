import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@college.com', description: 'The email of the admin' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the admin (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;
}
