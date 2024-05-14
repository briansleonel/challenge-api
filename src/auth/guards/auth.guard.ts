import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IPayloadToken } from '../interfaces/auth.interface';
import { jwtConstanst } from 'src/common/constants/jwt.constants';
import { RequestWithUser } from '../interfaces/request.user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token');
    }

    const payload = await this.extractPayload(token);

    const isExpired = this.isExpiredToken(payload.exp);

    if (isExpired) {
      throw new UnauthorizedException('Expired token');
    }

    request.user = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private async extractPayload(token: string) {
    try {
      return (await this.jwtService.verifyAsync(token, {
        secret: jwtConstanst.secret,
      })) as IPayloadToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private isExpiredToken(exp: number) {
    const currentDate = new Date();
    const expiresDate = new Date(exp);

    return Number(expiresDate) <= Number(currentDate) / 1000;
  }
}
