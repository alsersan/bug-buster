import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtTokenPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class verifyJwtToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new UnauthorizedException('Please log in');
    }

    try {
      const user = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET,
      ) as JwtTokenPayload;
      if (user.userId && user.role) {
        req['user'] = user;
      } else {
        throw new UnauthorizedException(
          'This content is only available to authenticated users',
        );
      }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Please log in');
      }
      throw new UnauthorizedException(
        'This content is only available to authenticated users',
      );
    }
    next();
  }
}
