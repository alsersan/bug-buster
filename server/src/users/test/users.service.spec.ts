import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('Given the UsersService', () => {
  let service: UsersService;
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
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn().mockResolvedValue([mockUser]),
            findById: jest.fn().mockResolvedValue(mockUser),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));

    service.processQuery = jest.fn((param) => param);
  });
  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when createUser is called', () => {
    let user;
    beforeEach(async () => {
      const bcryptHash = jest.fn().mockResolvedValue('hashedPassword');
      (bcrypt.hash as jest.Mock) = bcryptHash;
      jest.spyOn(model, 'findById').mockResolvedValueOnce({
        ...mockUser,
        password: 'hashedPassword',
      } as any);
      user = await service.createUser(mockUser);
    });
    test('then model.create should be called with new user and hashed password', () => {
      expect(model.create).toHaveBeenCalledWith({
        ...mockUser,
        password: 'hashedPassword',
      });
    });
    test('then model.findById should be called with id of new user', () => {
      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
    });
    test('then it should return the new user with hashed password', () => {
      expect(user).toEqual({
        ...mockUser,
        password: 'hashedPassword',
      });
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('when getAllUsers is called', () => {
    let users;
    beforeEach(async () => {
      users = await service.getAllUsers();
    });
    test('then model.find should be called', () => {
      expect(model.find).toHaveBeenCalled();
    });
    test('then it should return all users', () => {
      expect(users).toEqual([mockUser]);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When getUserById is called', () => {
    let user;
    beforeEach(async () => {
      user = await service.getUserById(mockUser._id);
    });
    test('then model.findById should be called with the user id', () => {
      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
    });
    test('then it should return one user', () => {
      expect(user).toEqual(mockUser);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When updateUser is called', () => {
    let user;
    beforeEach(async () => {
      user = await service.updateUser(mockUser._id, new UpdateUserDto());
    });
    test('then model.findByIdAndUpdate should be called with the user id and dto', () => {
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        new UpdateUserDto(),
      );
    });
    test('then it should return the updated user', () => {
      expect(user).toEqual(mockUser);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When deleteUser is called', () => {
    let message;
    beforeEach(async () => {
      message = await service.deleteUser(mockUser._id);
    });
    test('then model.findByIdAndDelete should be called with the user id', () => {
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
    });
    test('then it should return a message', () => {
      expect(message).toEqual({ deletedUserId: mockUser._id });
    });
  });
});
