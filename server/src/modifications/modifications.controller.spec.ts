import { Test, TestingModule } from '@nestjs/testing';
import { CreateModificationDto } from './dto/create-modification.dto';
import { ModificationsController } from './modifications.controller';
import { ModificationsService } from './modifications.service';

describe('ModificationsController', () => {
  let controller: ModificationsController;
  let service: ModificationsService;

  const mockModification = {
    _id: '1',
    modifiedProperty: 'test',
    oldValue: 'test',
    newValue: 'test',
    dateCreated: 'today',
    author: '',
    ticket: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModificationsController],
      providers: [
        {
          provide: ModificationsService,
          useValue: {
            createModification: jest.fn().mockResolvedValue(mockModification),
            getAllModifications: jest
              .fn()
              .mockResolvedValue([mockModification]),
            getModificationById: jest.fn().mockResolvedValue(mockModification),
            updateModification: jest.fn().mockResolvedValue(mockModification),
            deleteModification: jest.fn().mockResolvedValue({
              deletedModificationId: mockModification._id,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ModificationsController>(ModificationsController);
    service = module.get<ModificationsService>(ModificationsService);
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('when create is called', () => {
    test('then ModificationsService.createModification should be called with a new modification', async () => {
      const newModification = new CreateModificationDto();
      await controller.create(newModification);
      expect(service.createModification).toHaveBeenCalledWith(newModification);
    });
    test('then it should return a new modification', async () => {
      const newModification = await controller.create(
        new CreateModificationDto(),
      );
      expect(newModification).toEqual(mockModification);
    });
  });
});
