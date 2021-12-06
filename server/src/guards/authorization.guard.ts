import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtTokenPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user: JwtTokenPayload = request['user'];
    const isAllowed = allowedRoles.includes(user.role);

    if (!isAllowed) {
      throw new ForbiddenException(
        'You are not authorized to view this content',
      );
    }
    return true;
  }
}
