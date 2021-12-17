import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { User, UserState } from 'src/app/models/user.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  @Input() project!: Project;
  @Output() isVisible = new EventEmitter<boolean>();
  loguedInUser!: User;

  constructor(
    private store: Store<{ projects: Project[]; loguedInUser: UserState }>
  ) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user.user));
  }

  onCreateBtnClick() {
    this.isVisible.emit(true);
  }
}
