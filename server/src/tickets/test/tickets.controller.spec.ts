import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { TicketsController } from '../tickets.controller';
import { TicketsService } from '../tickets.service';

describe('Given the TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  const mockTicket = {
    _id: '1',
    name: 'test',
    description: 'test',
    status: 'pending',
    priority: 'test',
    type: 'test',
    dateCreated: 'today',
    dateClosed: null,
    project: '',
    author: '',
    assignedTo: [],
    modifications: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: {
            createTicket: jest.fn().mockResolvedValue(mockTicket),
            getAllTickets: jest.fn().mockResolvedValue([mockTicket]),
            getTicketById: jest.fn().mockResolvedValue(mockTicket),
            updateTicket: jest.fn().mockResolvedValue(mockTicket),
            deleteTicket: jest
              .fn()
              .mockResolvedValue({ deletedTicketId: mockTicket._id }),
          },
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  describe('when it is instantiated', () => {
    test('then it should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('when create is called', () => {
    test('then TicketsService.createTicket should be called with a new ticket', async () => {
      const newTicket = new CreateTicketDto();
      await controller.create(newTicket);
      expect(service.createTicket).toHaveBeenCalledWith(newTicket);
    });
    test('then it should return a new ticket', async () => {
      const newTicket = await controller.create(new CreateTicketDto());
      expect(newTicket).toEqual(mockTicket);
    });
  });

  describe('when findOne is called', () => {
    test('then TicketsService.getTicketById should be called with a ticket id', async () => {
      await controller.findOne(mockTicket._id);
      expect(service.getTicketById).toHaveBeenCalledWith(mockTicket._id);
    });
    test('then it should return one ticket', async () => {
      const ticket = await controller.findOne(mockTicket._id);
      expect(ticket).toEqual(mockTicket);
    });
  });

  describe('when update is called', () => {
    test('then TicketsService.updateTicket should be called with a ticket id and update object', async () => {
      const TicketUpdate = new UpdateTicketDto();
      await controller.update(mockTicket._id, TicketUpdate);
      expect(service.updateTicket).toHaveBeenCalledWith(
        mockTicket._id,
        TicketUpdate,
      );
    });
    test('then it should return the modified ticket', async () => {
      const ticket = await controller.update(
        mockTicket._id,
        new UpdateTicketDto(),
      );
      expect(ticket).toEqual(mockTicket);
    });
  });

  describe('when delete is called', () => {
    test('then TicketsService.deleteTicket should be called with a ticket id', async () => {
      await controller.delete('1');
      expect(service.deleteTicket).toHaveBeenCalledWith('1');
    });
  });
  test('then it should return a message', async () => {
    const message = await controller.delete(mockTicket._id);
    expect(message).toEqual({ deletedTicketId: mockTicket._id });
  });
});
