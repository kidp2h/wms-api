import { HttpExceptionFilter } from '@/common/exceptions/HttpExceptionFilter';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const accessToken =
      headers?.authorization?.split('Bearer ')[1] ||
      headers.authorization ||
      null;

    if (accessToken) {
      try {
        const payload = this.jwtService.verify(accessToken);
        request.user = payload;
        return true;
      } catch (error) {
        throw new HttpException('Unauthorized', 401);
      }
    } else throw new HttpException('Unauthorized', 401);
  }
}
