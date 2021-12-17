import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { Ticket } from 'src/app/models/ticket.model';
import { UserState } from 'src/app/models/user.model';
import { createComment } from 'src/app/store/comments/comments.actions';
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

  constructor(
    private store: Store<{ loguedInUser: UserState; projects: Project[] }>
  ) {}

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
      const formResult = this.addComment.value;
      const newComment = {
        ticket: this.ticket._id!,
        content: formResult.comment.trim(),
        dateCreated: new Date(),
        author: this.loguedInUser.user._id!,
      };
      this.store.dispatch(createComment({ comment: newComment }));
      this.addComment.reset();
    }
  }
}
