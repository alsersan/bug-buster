import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
import { UserState } from 'src/app/models/user.model';
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
  loguedInUser!: UserState;

  constructor(private store: Store<{ loguedInUser: UserState }>) {}

  ngOnInit(): void {
    this.addComment = new FormGroup({
      comment: new FormControl('', Validators.required),
    });

    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user));
  }

  onSubmit() {
    if (this.addComment.valid) {
      console.log(this.addComment.value);
      const formResult = this.addComment.value;
      const newComment = {
        ticket: this.ticket._id,
        content: formResult.comment.trim(),
        dateCreated: new Date(),
        author: this.loguedInUser.user._id,
      };
      console.log(newComment);
    }
  }
}
