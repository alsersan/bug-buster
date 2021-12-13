import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { capitalizedRoles } from 'src/app/utils/roles';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  @Input() project!: Project;
  roles = capitalizedRoles;

  constructor() {}

  deleteMember(userId: string) {}
}
