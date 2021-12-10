import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { login } from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean = false;
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private store: Store<{ loguedInUser: User }>) {}

  onSubmit() {
    this.store.dispatch(login(this.login.value));
  }
}
