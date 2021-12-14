import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

import { TicketDetailsComponent } from './ticket-details.component';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    component.ticket = {
      _id: 's',
      name: '',
      status: '',
      dateClosed: null,
      dateCreated: new Date(),
      description: '',
      assignedTo: [],
      modifications: [],
      priority: '',
      type: '',
      project: { _id: '' } as Project,
      author: {
        name: '',
        surname: '',
        role: '',
      } as User,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
