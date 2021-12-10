import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  roles: Record<string, string> = {
    admin: 'Administrator',
    ['project-manager']: 'Project Manager',
    developer: 'Developer',
    ['quality-assurance']: 'Quality Assurance',
  };
  loguedInUser!: User;

  constructor(private store: Store<{ loguedInUser: User }>) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }
}
