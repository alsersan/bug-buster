import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('Given the UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const mockUser = {
    _id: '1',
    name: 'test',
    surname: 'test',
    avatarUrl: 'pending',
    role: 'test',
    seniority: 'test',
    email: 'today',
    password: 'project1',
    projects: [],
    tickets: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getAllUsers: jest.fn().mockResolvedValue([mockUser]),
            getUserById: jest.fn().mockResolvedValue(mockUser),
            updateUser: jest.fn().mockResolvedValue(mockUser),
            deleteUser: jest
              .fn()
              .mockResolvedValue({ deletedUserId: mockUser._id }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('when create is called', () => {
    test('then UsersService.createUser should be called with a new user', async () => {
      const newUser = new CreateUserDto();
      await controller.create(newUser);
      expect(service.createUser).toHaveBeenCalledWith(newUser);
    });
    test('then it should return a new user', async () => {
      const newUser = await controller.create(new CreateUserDto());
      expect(newUser).toEqual(mockUser);
    });
  });

  describe('when findAll is called', () => {
    test('then UsersService.getAllUsers should be called', async () => {
      await controller.findAll();
      expect(service.getAllUsers).toHaveBeenCalled();
    });
    test('then it should return all users', async () => {
      const users = await controller.findAll();
      expect(users[0]).toEqual(mockUser);
    });
  });

  describe('when findOne is called', () => {
    test('then UsersService.getUserById should be called with a user id', async () => {
      await controller.findOne(mockUser._id);
      expect(service.getUserById).toHaveBeenCalledWith(mockUser._id);
    });
    test('then it should return one user', async () => {
      const user = await controller.findOne(mockUser._id);
      expect(user).toEqual(mockUser);
    });
  });

  describe('when update is called', () => {
    test('then UsersService.updateUser should be called with a user id and update object', async () => {
      const userUpdate = new UpdateUserDto();
      await controller.update(mockUser._id, userUpdate);
      expect(service.updateUser).toHaveBeenCalledWith(mockUser._id, userUpdate);
    });
    test('then it should return the modified user', async () => {
      const user = await controller.update(mockUser._id, new UpdateUserDto());
      expect(user).toEqual(mockUser);
    });
  });

  describe('when delete is called', () => {
    test('then UsersService.deleteUser should be called with a user id', async () => {
      await controller.delete(mockUser._id);
      expect(service.deleteUser).toHaveBeenCalledWith(mockUser._id);
    });
    test('then it should return a message', async () => {
      const message = await controller.delete(mockUser._id);
      expect(message).toEqual({ deletedUserId: mockUser._id });
    });
  });
});
