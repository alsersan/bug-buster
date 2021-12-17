import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { FilterStatusPipe } from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    CreateUserComponent,
    FilterStatusPipe,
  ],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
