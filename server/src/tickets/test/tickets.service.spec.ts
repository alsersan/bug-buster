import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { addItemToList, removeItemFromList } from 'src/utils/add-remove-items';
import { getChangedItems } from 'src/utils/get-changed-items';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Ticket } from '../schemas/ticket.schema';
import { TicketsService } from '../tickets.service';

describe('Given the TicketsService', () => {
  let service: TicketsService;
  let model: Model<Ticket>;

  const mockTicket = {
    _id: '1',
    name: 'test',
    description: 'test',
    status: 'test',
    priority: 'test',
    type: 'test',
    dateCreated: 'today',
    dateClosed: null,
    project: '',
    author: '',
    assignedTo: ['', ''],
    modifications: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getModelToken('Ticket'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockTicket),
            find: jest.fn().mockResolvedValue([mockTicket]),
            findById: jest.fn().mockResolvedValue(mockTicket),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockTicket),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockTicket),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
        {
          provide: getModelToken('Project'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    model = module.get<Model<Ticket>>(getModelToken('Ticket'));

    service.processQuery = jest.fn((param) => param);
    const addItem = jest.fn();
    (addItemToList as jest.Mock) = addItem;
    const removeItem = jest.fn();
    (removeItemFromList as jest.Mock) = removeItem;
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when createTicket is called', () => {
    let ticket;
    beforeEach(async () => {
      ticket = await service.createTicket(
        mockTicket as unknown as CreateTicketDto,
      );
    });
    test('then model.create should be called with new ticket', () => {
      expect(model.create).toHaveBeenCalledWith(mockTicket);
    });
    test('then model.findById should be called with id of new ticket', () => {
      expect(model.findById).toHaveBeenCalledWith(mockTicket._id);
    });
    test('then it should return the new ticket', () => {
      expect(ticket).toEqual(mockTicket);
    });
    test('then addItemToList should be called', () => {
      expect(addItemToList).toHaveBeenCalled();
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When getTicketsById is called', () => {
    let ticket;
    beforeEach(async () => {
      ticket = await service.getTicketById(mockTicket._id);
    });
    test('then model.findById should be called with the ticket id', () => {
      expect(model.findById).toHaveBeenCalledWith(mockTicket._id);
    });
    test('then it should return one ticket', () => {
      expect(ticket).toEqual(mockTicket);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When updateUser is called', () => {
    const getChanges = jest
      .fn()
      .mockReturnValue({ removed: ['', ''], added: ['', '', ''] });
    (getChangedItems as jest.Mock) = getChanges;
    let ticket;
    beforeEach(async () => {
      ticket = await service.updateTicket(mockTicket._id, {
        assignedTo: [],
      } as UpdateTicketDto);
    });
    test('then model.findByIdAndUpdate should be called with the ticket id and dto', () => {
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTicket._id,
        {
          assignedTo: [],
        },
        { new: true },
      );
    });
    test('then it should return the updated ticket', () => {
      expect(ticket).toEqual(mockTicket);
    });
    test('then getChangedItems should be called', () => {
      expect(getChangedItems).toHaveBeenCalled();
    });
    test('then removeItemFromList should be called 2 times', () => {
      expect(removeItemFromList).toHaveBeenCalledTimes(2);
    });
    test('then addItemToList should be called 3 times', () => {
      expect(addItemToList).toHaveBeenCalledTimes(3);
    });
    test('then processQuery should be called', () => {
      expect(service.processQuery).toHaveBeenCalled();
    });
  });

  describe('When deleteTicket is called', () => {
    let message;
    beforeEach(async () => {
      message = await service.deleteTicket(mockTicket._id);
    });
    test('then model.findByIdAndDelete should be called with the ticket id', () => {
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockTicket._id);
    });
    test('then removeItemFromList should be called 3 times', () => {
      expect(removeItemFromList).toHaveBeenCalledTimes(3);
    });
    test('then it should return a message', () => {
      expect(message).toEqual({ deletedTicketId: mockTicket._id });
    });
  });
});
