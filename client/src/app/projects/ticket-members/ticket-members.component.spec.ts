import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

import { TicketMembersComponent } from './ticket-members.component';

describe('TicketMembersComponent', () => {
  let component: TicketMembersComponent;
  let fixture: ComponentFixture<TicketMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketMembersComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMembersComponent);
    component = fixture.componentInstance;
    component.ticket = {
      _id: '',
      name: '',
      status: '',
      comments: [],
      dateClosed: null,
      dateCreated: new Date(),
      description: '',
      assignedTo: [],
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
