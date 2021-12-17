import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-members',
  templateUrl: './ticket-members.component.html',
  styleUrls: ['./ticket-members.component.scss'],
})
export class TicketMembersComponent {
  @Input() ticket!: Ticket;
  roles = capitalizedRoles;

  constructor() {}
}
