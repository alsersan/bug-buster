import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketCommentsComponent } from './ticket-comments.component';

describe('TicketCommentsComponent', () => {
  let component: TicketCommentsComponent;
  let fixture: ComponentFixture<TicketCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketCommentsComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
