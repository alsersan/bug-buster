import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class verifyJwtToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      throw new UnauthorizedException('Please log in to view this content');
    }

    interface jwtTokenPayload {
      userId: string;
      role: string;
      iat: number;
      exp: number;
    }

    try {
      const user = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET,
      ) as jwtTokenPayload;
      console.log(user);
      if (user.userId) {
        req['user'] = user;
        console.log('Found jwt', req['user']);
      }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Please log in to view this content');
      }
      throw new UnauthorizedException(
        'You are not authorized to view this content',
      );
    }
    next();
  }
}
