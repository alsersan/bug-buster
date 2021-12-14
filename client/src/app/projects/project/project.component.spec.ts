import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { MembersComponent } from '../members/members.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { TicketsComponent } from '../tickets/tickets.component';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let initialState = {
    projects: [
      {
        _id: '1',
        name: 'test',
        description: 'test',
        dateCreated: new Date(),
        dateClosed: null,
        tickets: [],
        members: {
          projectManager: '',
          developers: [],
          qualityAssurance: [],
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        MembersComponent,
        ProjectDetailsComponent,
        TicketsComponent,
        CreateTicketComponent,
      ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
