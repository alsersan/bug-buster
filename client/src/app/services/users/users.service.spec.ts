import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';

const mockUser = {
  name: 'testUser',
};
const url = 'http://localhost:3000/users';

describe('Given UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('when it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when createUser is called', () => {
    it('it should return a new user', () => {
      service
        .createUser({
          name: '',
          surname: '',
          role: '',
          seniority: '',
          avatarUrl: '',
          email: '',
          password: '',
        })
        .subscribe((data) => {
          expect(JSON.stringify(data)).toEqual(JSON.stringify(mockUser));
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush(mockUser);
    });
  });

  describe('when getAllUsers is called', () => {
    it('it should return all the users', () => {
      service.getAllUsers().subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify([mockUser]));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush([mockUser]);
    });
  });

  describe('when getUserById is called', () => {
    it('it should one users', () => {
      const userId = '1';
      service.getUserById(userId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockUser));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: `${url}/${userId}`,
      });

      expect(req.request.url).toBe(`${url}/${userId}`);

      req.flush(mockUser);
    });
  });

  describe('when getUserWithToken is called', () => {
    it('it should one users', () => {
      const userId = '1';
      service.getUserWithToken().subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockUser));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: `${url}/token`,
      });

      expect(req.request.url).toBe(`${url}/token`);

      req.flush(mockUser);
    });
  });

  describe('when updateUser is called', () => {
    it('it should return the updated user', () => {
      const userId = '1';
      service.updateUser(userId, { name: '' }).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockUser));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: `${url}/${userId}`,
      });

      expect(req.request.url).toBe(`${url}/${userId}`);

      req.flush(mockUser);
    });
  });

  describe('when deleteUser is called', () => {
    it('it should return a delete message', () => {
      const userId = '1';
      const deleteMsg = { deletedUserId: userId };
      service.deleteUser(userId).subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(deleteMsg));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${url}/${userId}`,
      });

      expect(req.request.url).toBe(`${url}/${userId}`);

      req.flush(deleteMsg);
    });
  });
});
