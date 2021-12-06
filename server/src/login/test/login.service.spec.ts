import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../login.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

describe('Given the LoginService', () => {
  let service: LoginService;
  let model: Model<User>;

  const mockUser = {
    _id: '1',
    name: 'John',
    surname: 'Doe',
    avatarUrl: 'imageUrl',
    role: 'admin',
    seniority: 'senior',
    email: 'test@test.com',
    password: '1234',
    projects: [],
    tickets: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when loginUser is called and the email does not exist in database', () => {
    beforeEach(() => {
      const bcryptHash = jest.fn().mockResolvedValue('hashedPassword');
      (bcrypt.hash as jest.Mock) = bcryptHash;
    });
    test('then it should throw an error', () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(undefined);
      expect(() =>
        service.loginUser(mockUser.email, mockUser.password),
      ).toThrow('Invalid email or password');
    });
  });
});
