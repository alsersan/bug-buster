import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @Input() project$!: Observable<Project>;

  constructor() {}

  ngOnInit(): void {}
}
