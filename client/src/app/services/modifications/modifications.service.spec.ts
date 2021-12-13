import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModificationsService } from './modifications.service';

describe('ModificationsService', () => {
  let service: ModificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
