import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TicketCommentsComponent } from '../ticket-comments/ticket-comments.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { TicketMembersComponent } from '../ticket-members/ticket-members.component';

import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;
  let initialState = {
    projects: [
      {
        _id: '1',
        name: 'test',
        description: 'test',
        dateCreated: new Date(),
        dateClosed: null,
        tickets: [
          {
            _id: '',
            name: '',
            status: '',
            dateClosed: null,
            dateCreated: new Date(),
            description: '',
            assignedTo: [],
            priority: '',
            type: '',
            project: { _id: '' },
            author: {
              name: '',
              surname: '',
              role: '',
            },
          },
        ],
        members: {
          projectManager: { name: '', surname: '', role: '', seniority: '' },
          developers: [{ name: '', surname: '', role: '', seniority: '' }],
          qualityAssurance: [
            { name: '', surname: '', role: '', seniority: '' },
          ],
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TicketComponent,
        TicketMembersComponent,
        TicketDetailsComponent,
        TicketCommentsComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1', ticketId: '1' }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
