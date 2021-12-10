import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loguedInUser!: User;
  constructor(private store: Store<{ loguedInUser: User }>) {}

  ngOnInit(): void {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }
}
