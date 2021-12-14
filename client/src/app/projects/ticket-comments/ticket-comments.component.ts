import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss'],
})
export class TicketCommentsComponent implements OnInit {
  addComment!: FormGroup;

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
