import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent {
  @Input() project!: Project;
  @Output() isVisible = new EventEmitter<boolean>();

  constructor() {}

  onCreateBtnClick() {
    this.isVisible.emit(true);
  }
}
