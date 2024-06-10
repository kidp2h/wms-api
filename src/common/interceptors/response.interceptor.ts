import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage } from '../decorators/message.decorator';

export interface Response<T> {
  status: number;
  message: string | null;
  data: T | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => {
        console.log(data)
        if (data) {
          const decoratorMessage =
            this.reflector.get<IMessage>(
              'message_success',
              context.getHandler(),
            ) || null;
          context
            .switchToHttp()
            .getResponse()
            .status(decoratorMessage?.status || 201);
          return {
            status: decoratorMessage?.status,
            message: decoratorMessage?.message || null,
            data: data,
          };
        } else {
          const decoratorMessage =
            this.reflector.get<IMessage>(
              'message_error',
              context.getHandler(),
            ) || null;
          context
            .switchToHttp()
            .getResponse()
            .status(decoratorMessage?.status || 404);
          return {
            status: decoratorMessage?.status || 404,
            message: decoratorMessage?.message || null,
            data: null,
          };
        }
      }),
    );
  }
}
