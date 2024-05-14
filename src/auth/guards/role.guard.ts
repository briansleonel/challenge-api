import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/constants/keys-decorators.constants';
import { Role } from 'src/common/enums/role.enum';
import { RequestWithUser } from '../interfaces/request.user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(roles);

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (user.role === Role.ADMIN) return true;

    const some = roles.some((r) => r === user.role);

    console.log(some);

    return some;
  }
}
