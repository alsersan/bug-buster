import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordUpdate, User, UserState } from '../models/user.model';
import { UsersService } from '../services/users/users.service';
import { capitalizedRoles } from '../utils/roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  roles = capitalizedRoles;
  isPasswordEditActive: boolean = false;
  editPassword!: FormGroup;
  user!: User;
  constructor(
    private store: Store<{ loguedInUser: UserState }>,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.user = user.user));

    this.editPassword = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      repeatNewPassword: new FormControl(''),
    });
  }

  togglePasswordEdit() {
    this.isPasswordEditActive = !this.isPasswordEditActive;
  }

  onSubmit() {
    if (this.editPassword.valid) {
      const formResult = this.editPassword.value;
      const update: PasswordUpdate = {
        currentPassword: formResult.currentPassword,
        newPassword: formResult.newPassword,
      };
      this.usersService.updatePasswordWithToken(update).subscribe({
        next: () => {
          console.log('pasword changed');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
