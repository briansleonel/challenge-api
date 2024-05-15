import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { RESPONSE_MESSAGE_KEY } from 'src/common/constants/keys-decorators.constants';
import { IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const handler = context.getHandler();
    const message = Reflect.getMetadata(RESPONSE_MESSAGE_KEY, handler);
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data,
        message,
      })),
    );
  }
}
