import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent {
  @Input() ticket!: Ticket;
  @Output() isVisible = new EventEmitter<boolean>();
  roles = capitalizedRoles;

  constructor() {}

  onClick() {
    this.isVisible.emit(true);
  }
}
