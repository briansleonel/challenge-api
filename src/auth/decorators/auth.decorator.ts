import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';

export const Auth = (...roles: Array<Role>) =>
  applyDecorators(UseGuards(AuthGuard));
