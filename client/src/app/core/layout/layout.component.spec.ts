import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let initialState = {
    loguedInUser: {
      user: { name: 'test' },
      loginFailed: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
