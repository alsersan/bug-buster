import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ModificationsService } from './modifications.service';
import { User } from 'src/app/models/user.model';
import { Ticket } from 'src/app/models/ticket.model';

const mockModification = {
  modifiedProperty: 'testModification',
};

describe('Given ModificationsService', () => {
  let service: ModificationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModificationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('when it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when createModification is called', () => {
    it('should return a new modification', () => {
      service
        .createModification({
          modifiedProperty: '',
          oldValue: '',
          newValue: '',
          author: {} as User,
          ticket: {} as Ticket,
          dateCreated: new Date(),
        })
        .subscribe((data) => {
          expect(JSON.stringify(data)).toEqual(
            JSON.stringify(mockModification)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/modifications',
      });

      expect(req.request.url).toBe('http://localhost:3000/modifications');

      req.flush(mockModification);
    });
  });
});
