import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { EditProjectComponent } from './edit-project.component';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let initialState = {
    users: [
      {
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
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProjectComponent],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
