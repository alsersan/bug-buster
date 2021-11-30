import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

const mockUser = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  avatarUrl: 'imageUrl',
  role: 'admin',
  seniority: 'senior',
  email: 'test@test.com',
  password: '1234',
};

describe('Given the UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      name: 'John',
      surname: 'Doe',
      avatarUrl: 'imageUrl',
      role: 'admin',
      seniority: 'senior',
      email: 'test@test.com',
      password: '1234',
    },
    {
      name: 'Jane',
      surname: 'Doe',
      avatarUrl: 'imageUrl',
      role: 'admin',
      seniority: 'senior',
      email: 'test2@test2.com',
      password: '123456',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });
  describe('when it is instantiated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when getAllUsers is called', () => {
    it('should return all users', async () => {
      jest.spyOn(model, 'find').mockResolvedValueOnce(usersArray as any);
      const users = await service.getAllUsers();
      expect(users).toEqual(usersArray);
    });
  });

  describe('When getUserById is called', () => {
    it('should return one user', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(usersArray[0] as any);
      const user = await service.getUserById('1');
      expect(user).toEqual(usersArray[0]);
    });
  });

  /* describe('When createUser is called', () => {
    it('should create one user', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(usersArray[0] as any);
      const user = await service.getUserById('1');
      expect(user).toEqual(usersArray[0]);
    });
  }); */
});
