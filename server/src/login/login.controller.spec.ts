import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('Given the LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  const token = 'mockToken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            loginUser: jest.fn().mockResolvedValue(token),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('when loginUser is called', () => {
    test('then LoginService.loginUser should be called with email and password', async () => {
      await controller.loginUser('email', 'password');
      expect(service.loginUser).toHaveBeenCalledWith('email', 'password');
    });
    test('then it should return a new token', async () => {
      const newToken = await controller.loginUser('email', 'password');
      expect(newToken).toBe(token);
    });
  });
});
