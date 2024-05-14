import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IAuthBody } from '../interfaces/auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto implements IAuthBody {
  @ApiProperty({ description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password" })
  @Transform(({ value }) => value.trim()) // quito espacios en blanco
  @IsString()
  password: string;
}
