import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IAuthBody } from '../interfaces/auth.interface';

export class LoginDto implements IAuthBody {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) // quito espacios en blanco
  @IsString()
  password: string;
}
