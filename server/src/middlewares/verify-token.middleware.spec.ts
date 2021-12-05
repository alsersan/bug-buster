import { NextFunction, Request, Response } from 'express';
import { VerifyJwtToken } from './verify-token.middleware';

describe('Given the VerifyToken middleware', () => {
  const req = {
    headers: {
      // authorization: '',
    },
  };
  const res = {};
  const next = jest.fn() as NextFunction;

  const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWFhNWQ4NTEwYzllNjU3MGRlNzMzMmUiLCJyb2xlIjoicHJvamVjdC1tYW5hZ2VyIiwiaWF0IjoxNjM4NjY2Nzg1LCJleHAiOjE2Mzg2NjY3ODZ9.lm3nutYrgje7HMD5iJTxi3vIC76qN-jKO6TY32wqQOs';

  let verify: VerifyJwtToken;
  beforeEach(() => {
    verify = new VerifyJwtToken();
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
      req.headers = { authorization: expiredToken };
      console.log(req);

      expect(() =>
        verify.use(
          req as unknown as Request,
          res as unknown as Response,
          next as unknown as NextFunction,
        ),
      ).toThrow('Please log in');
    });
  });

  /* describe('When the user provides a valid token', () => {});

  describe('When the user provides an invalid token', () => {});
  test('bla', () => {
    
    verify.use(req, res, next);
    console.log(verify);
  }); */
});
