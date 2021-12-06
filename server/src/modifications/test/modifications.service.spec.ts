import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { addItemToList } from 'src/utils/add-remove-items';
import { CreateModificationDto } from '../dto/create-modification.dto';
import { ModificationsService } from '../modifications.service';
import { Modification } from '../schemas/modification.schema';

describe('Given the ModificationsService', () => {
  let service: ModificationsService;
  let model: Model<Modification>;

  const mockModification = {
    _id: '1',
    modifiedProperty: 'test',
    oldValue: 'test',
    NewValue: 'test',
    author: '',
    ticket: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModificationsService,
        {
          provide: getModelToken('Modification'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockModification),
            findById: jest.fn().mockResolvedValue(mockModification),
          },
        },
        {
          provide: getModelToken('Ticket'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ModificationsService>(ModificationsService);
    model = module.get<Model<Modification>>(getModelToken('Modification'));

    service.processQuery = jest.fn((param) => param);
    const addItem = jest.fn();
    (addItemToList as jest.Mock) = addItem;
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when createModification is called', () => {
    let modification;
    beforeEach(async () => {
      modification = await service.createModification(
        mockModification as unknown as CreateModificationDto,
      );
    });
    test('then model.create should be called with new modification', () => {
      expect(model.create).toHaveBeenCalledWith(mockModification);
    });
    test('then model.findById should be called with id of new modification', () => {
      expect(model.findById).toHaveBeenCalledWith(mockModification._id);
    });
    test('then it should return the new modification', () => {
      expect(modification).toEqual(mockModification);
    });
    test('then addItemToList should be called', () => {
      expect(addItemToList).toHaveBeenCalled();
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });
});
