import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';
import { VerifyJwtToken } from './verify-token.middleware';

describe('Given the VerifyToken middleware', () => {
  const req = {
    headers: {},
  };
  const res = {};
  const next = jest.fn() as NextFunction;

  const ENV = process.env.NODE_ENV;

  let verify: VerifyJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
      ],
      providers: [VerifyJwtToken],
    }).compile();

    verify = module.get<VerifyJwtToken>(VerifyJwtToken);
    req.headers = {};
  });

  describe('When the user provides no token', () => {
    test('then it should throw an error', () => {
      expect(() =>
        verify.use(
          req as unknown as Request,
          res as unknown as Response,
          next as unknown as NextFunction,
        ),
      ).toThrow('Please log in');
    });
  });

  describe('When the user provides an invalid token', () => {
    test('then it should throw an error', () => {
      req.headers = { authorization: 'thisIsAnInvalidToken' };
      expect(() =>
        verify.use(
          req as unknown as Request,
          res as unknown as Response,
          next as unknown as NextFunction,
        ),
      ).toThrow('This content is only available to authenticated users');
    });
  });

  describe('When the user provides an expired token', () => {
    test('then it should throw an error', () => {
      req.headers = { authorization: process.env.EXPIRED_TOKEN };

      expect(() =>
        verify.use(
          req as unknown as Request,
          res as unknown as Response,
          next as unknown as NextFunction,
        ),
      ).toThrow('Please log in');
    });
  });

  describe('When the user provides a valid token with the wrong payload', () => {
    test('then it should throw an error', () => {
      req.headers = { authorization: process.env.NOUSER_TOKEN };

      expect(() =>
        verify.use(
          req as unknown as Request,
          res as unknown as Response,
          next as unknown as NextFunction,
        ),
      ).toThrow('This content is only available to authenticated users');
    });
  });

  describe('When the user provides a valid token with the right payload', () => {
    test('then it should throw an error', () => {
      req.headers = { authorization: process.env.VALID_TOKEN };
      verify.use(
        req as unknown as Request,
        res as unknown as Response,
        next as unknown as NextFunction,
      );
      expect(next).toHaveBeenCalled();
    });
  });
});
