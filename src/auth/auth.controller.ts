import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IActiveUser } from 'src/common/interfaces/active-user.interface';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Auth(Role.USER)
  @Get('profile')
  async profile(@ActiveUser() user: IActiveUser) {
    return await this.authService.profile(user);
  }

  @Auth(Role.USER)
  @Patch('profile')
  async updateProfile(
    @ActiveUser() user: IActiveUser,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.authService.updateProfile(user, payload);
  }
}
