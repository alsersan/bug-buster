import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket!: Ticket;
  roles = capitalizedRoles;

  constructor() {}

  ngOnInit(): void {}
}
