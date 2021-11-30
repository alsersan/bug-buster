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

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      id: '1',
      name: 'John',
      surname: 'Doe',
      avatarUrl: 'imageUrl',
      role: 'admin',
      seniority: 'senior',
      email: 'test@test.com',
      password: '1234',
    },
    {
      id: '2',
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockResolvedValueOnce(usersArray as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should return one user', async () => {
    jest.spyOn(model, 'findById').mockResolvedValueOnce(usersArray[0] as any);
    const user = await service.findOne('1');
    expect(user).toEqual(usersArray[0]);
  });
});
