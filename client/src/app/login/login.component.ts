import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserState } from '../models/user.model';
import { login } from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword: boolean = false;
  showError: boolean = false;
  login!: FormGroup;
  loguedInUser!: UserState;
  subscription: Subscription = this.store
    .select('loguedInUser')
    .subscribe((user) => {
      this.loguedInUser = user;
      if (user.loginFailed) {
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    });

  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this.store.dispatch(login(this.login.value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
