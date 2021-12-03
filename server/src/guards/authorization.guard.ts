import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtTokenPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRole: string) {}
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp();
    const request = host.getRequest();

    request.params.id;
    const user: JwtTokenPayload = request['user'];
    const isAllowed = this.allowedRole === user.role;

    if (!isAllowed) {
      throw new ForbiddenException(
        'You are not authorized to view this content',
      );
    }
    return true;
  }
}
