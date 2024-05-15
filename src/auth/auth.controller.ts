import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IActiveUser } from 'src/common/interfaces/active-user.interface';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in' })
  @ApiCreatedResponse({
    description: 'The user is successfully logged in',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ResponseMessage('User successfully logged in')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register an user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ResponseMessage('User successfully registered')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Auth(Role.USER)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({
    description: 'Show user profile',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized auth' })
  async profile(@ActiveUser() user: IActiveUser) {
    return await this.authService.profile(user);
  }

  @Auth(Role.USER)
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiOkResponse({
    description: 'User profile updated',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized auth' })
  @ResponseMessage('Profile successfully updated')
  async updateProfile(
    @ActiveUser() user: IActiveUser,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.authService.updateProfile(user, payload);
  }
}
