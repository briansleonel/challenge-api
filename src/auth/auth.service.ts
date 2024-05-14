import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { IBasePayloadToken } from './interfaces/auth.interface';
import { RegisterDto } from '../common/interfaces/register.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { IActiveUser } from 'src/common/interfaces/active-user.interface';
import { UpdateUserDto } from 'src/common/interfaces/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user);

    return { token, email, role: user.role };
  }

  async register(payload: RegisterDto) {
    const user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const registeredUser = await this.usersService.create(payload);

    const token = await this.generateToken(registeredUser);

    return { token, email: registeredUser.email, role: registeredUser.role };
  }

  async profile({ email }: IActiveUser) {
    return this.usersService.findOneByEmail(email);
  }

  async updateProfile({ sub }: IActiveUser, profile: UpdateUserDto) {
    return this.usersService.update(sub, profile);
  }

  private async generateToken({ email, id, role }: UserEntity) {
    try {
      const payload: IBasePayloadToken = {
        email,
        role,
        sub: id,
      };

      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
