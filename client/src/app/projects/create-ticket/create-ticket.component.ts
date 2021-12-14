import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { UserState } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  @Input() project!: Project;
  ticketTypes = [
    { name: 'Bug', value: 'bug' },
    { name: 'Feature request', value: 'feature-request' },
    { name: 'Other', value: 'other' },
  ];
  ticketPriorities = [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
    { name: 'Immediate', value: 'immediate' },
  ];
  createTicket!: FormGroup;
  loguedInUser!: UserState;

  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit(): void {
    this.createTicket = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        priority: new FormControl('', Validators.required),
      },
      { updateOn: 'blur' }
    );

    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }

  onSubmit() {
    if (this.createTicket.valid) {
      const formResult = this.createTicket.value;
      const ticket = {
        name: formResult.name,
        description: formResult.description,
        type: formResult.type,
        priority: formResult.priority,
        dateCreated: new Date(),
        project: this.project._id,
        author: this.loguedInUser.user._id,
      };
      console.log(ticket);
    }
  }
}
