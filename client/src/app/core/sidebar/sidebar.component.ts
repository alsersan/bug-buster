import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sections: string[] = ['dashboard', 'projects', 'users'];
  loguedInUser!: User;

  constructor(private store: Store<{ loguedInUser: User }>) {}
  ngOnInit(): void {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }
}
