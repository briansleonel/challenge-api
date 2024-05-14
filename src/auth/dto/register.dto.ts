import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  firstName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) // quito espacios en blanco
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  role?: Role;
}
