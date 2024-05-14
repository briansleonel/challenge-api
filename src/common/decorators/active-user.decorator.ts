import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interfaces/request.user';

export const ActiveUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
