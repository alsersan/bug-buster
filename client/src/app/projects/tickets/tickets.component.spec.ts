import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsComponent } from './tickets.component';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    component.project = {
      name: '',
      status: '',
      dateClosed: null,
      dateCreated: new Date(),
      description: '',
      tickets: [],
      members: {
        projectManager: {
          name: '',
          surname: '',
          avatarUrl: '',
          role: '',
          seniority: '',
          email: '',
          projects: [],
          tickets: [],
        },
        developers: [],
        qualityAssurance: [],
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
