import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
import { User, UserState } from 'src/app/models/user.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket!: Ticket;
  @Output() isVisible = new EventEmitter<boolean>();
  roles = capitalizedRoles;
  loguedInUser!: User;

  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user.user));
  }

  onClick() {
    this.isVisible.emit(true);
  }
}
