import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
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
          dateRegistered: new Date(),
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
