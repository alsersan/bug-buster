import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';
import { User, UserState } from 'src/app/models/user.model';
import { deleteProject } from 'src/app/store/projects/projects.actions';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project!: Project;
  @Output() isVisible = new EventEmitter<boolean>();
  loguedInUser!: User;

  constructor(
    private store: Store<{ projects: Project[]; loguedInUser: UserState }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .select('loguedInUser')
      .subscribe((user) => (this.loguedInUser = user.user));
  }

  delete(projectId: string) {
    this.store.dispatch(deleteProject({ projectId }));
    this.router.navigateByUrl('/projects');
  }

  onClick() {
    this.isVisible.emit(true);
  }
}
