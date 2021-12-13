import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TicketsService } from './tickets.service';
import { User } from 'src/app/models/user.model';
import { Project } from 'src/app/models/project.model';

const mockTicket = {
  name: 'testUser',
};
const url = 'http://localhost:3000/tickets';

describe('Given TicketsService', () => {
  let service: TicketsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TicketsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('when it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when createTicket is called', () => {
    it('it should return a new ticket', () => {
      service
        .createTicket({
          name: '',
          description: '',
          priority: '',
          type: '',
          dateCreated: new Date(),
          author: {} as User,
          project: {} as Project,
        })
        .subscribe((data) => {
          expect(JSON.stringify(data)).toEqual(JSON.stringify(mockTicket));
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush(mockTicket);
    });
  });

  describe('when getTicketById is called', () => {
    it('it should return one ticket', () => {
      const ticketId = '1';
      service.getTicketById(ticketId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockTicket));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: `${url}/${ticketId}`,
      });

      expect(req.request.url).toBe(`${url}/${ticketId}`);

      req.flush(mockTicket);
    });
  });

  describe('when updateTicket is called', () => {
    it('it should return the updated ticket', () => {
      const ticketId = '1';
      service.updateTicket(ticketId, { name: '' }).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockTicket));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: `${url}/${ticketId}`,
      });

      expect(req.request.url).toBe(`${url}/${ticketId}`);

      req.flush(mockTicket);
    });
  });

  describe('when deleteTicket is called', () => {
    it('it should return a delete message', () => {
      const ticketId = '1';
      const deleteMsg = { deletedTicketId: ticketId };
      service.deleteTicket(ticketId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(deleteMsg));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${url}/${ticketId}`,
      });

      expect(req.request.url).toBe(`${url}/${ticketId}`);

      req.flush(deleteMsg);
    });
  });
});
