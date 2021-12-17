import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loguedInUser!: UserState;
  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit(): void {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }
}
