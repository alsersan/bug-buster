import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss'],
})
export class TicketCommentsComponent implements OnInit {
  @Input() ticket!: Ticket;
  roles = capitalizedRoles;
  addComment!: FormGroup;
  comments = [
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
    {
      author: {
        name: 'Pepito',
        surname: 'Fernandez',
        role: 'developer',
      },
      content: 'blablab lablabla alblaba ablalbal albalb',
      dateCreated: '2021-12-13T09:39:19.639+00:00',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.addComment = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.addComment.valid) {
      console.log(this.addComment.value);
    }
  }
}
