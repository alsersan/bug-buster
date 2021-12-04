import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Given the UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
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
    test('then UsersService.createUser should be called', async () => {
      await controller.create(new CreateUserDto());
      expect(service.createUser).toHaveBeenCalled();
    });
    test('then UsersService.createUser should be called with a new user', async () => {
      const newUser = new CreateUserDto();
      await controller.create(newUser);
      expect(service.createUser).toHaveBeenCalledWith(newUser);
    });
  });

  describe('when findAll is called', () => {
    test('then UsersService.getAllUsers should be called', async () => {
      await controller.findAll();
      expect(service.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('when findOne is called', () => {
    test('then UsersService.getUserById should be called', async () => {
      await controller.findOne('1');
      expect(service.getUserById).toHaveBeenCalled();
    });
    test('then UsersService.getUserById should be called with a user id', async () => {
      await controller.findOne('1');
      expect(service.getUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('when update is called', () => {
    test('then UsersService.updateUser should be called', async () => {
      await controller.update('1', new UpdateUserDto());
      expect(service.updateUser).toHaveBeenCalled();
    });
    test('then UsersService.updateUser should be called with a user id and update object', async () => {
      const userUpdate = new UpdateUserDto();
      await controller.update('1', userUpdate);
      expect(service.updateUser).toHaveBeenCalledWith('1', userUpdate);
    });
  });

  describe('when delete is called', () => {
    test('then UsersService.deleteUser should be called', async () => {
      await controller.delete('1');
      expect(service.deleteUser).toHaveBeenCalled();
    });
    test('then UsersService.deleteUser should be called with a user id', async () => {
      await controller.delete('1');
      expect(service.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
