import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './roles.decorator';
import { RoleGuard } from '../guards/role.guard';

export const Auth = (...roles: Array<Role>) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
