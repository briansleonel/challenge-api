import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: "User's first name" })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password" })
  @Transform(({ value }) => value.trim()) // quito espacios en blanco
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ description: "User's role", enum: Role })
  @IsOptional()
  role?: Role;
}
