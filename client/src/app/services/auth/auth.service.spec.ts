import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

const mockToken = {
  jwtToken: 'token',
};

describe('Given AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('when it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when login is called', () => {
    it('it should return a token', () => {
      service.login('test@test.com', 'password').subscribe((data) => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(mockToken));
      });

      const url = 'http://localhost:3000/login';
      const req = httpTestingController.expectOne({
        method: 'POST',
        url: url,
      });

      expect(req.request.url).toBe(url);

      req.flush(mockToken);
    });
  });

  describe('when logout is called', () => {
    let storage: Record<string, string> = { jwtToken: 'token' };
    beforeEach(() => {
      const mockLocalStorage = {
        removeItem: (key: string) => {
          delete storage[key];
        },
      };
      spyOn(localStorage, 'removeItem').and.callFake(
        mockLocalStorage.removeItem
      );
    });
    it('it should delete token from local storage', () => {
      service.logout();
      expect(storage).toEqual({});
    });
  });
});
