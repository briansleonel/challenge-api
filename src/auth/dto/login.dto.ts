import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { IAuthBody } from '../interfaces/auth.interface';

export class LoginDto implements IAuthBody {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) // quito espacios en blanco
  @IsString()
  @MinLength(8)
  password: string;
}
