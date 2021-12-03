import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtTokenPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp();
    const request = host.getRequest();

    const user: JwtTokenPayload = request['user'];
    const isAllowed = user.role === 'admin';

    if (!isAllowed) {
      throw new ForbiddenException(
        'You are not authorized to view this content',
      );
    }
    return true;
  }
}
