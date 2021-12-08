import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Array<Project>> = this.store.select('projects');
  project$: Observable<Project> = this.projects$.pipe(
    map(
      (array) =>
        array.find((el) => el._id === this.route.snapshot.paramMap.get('id'))!
    )
  );

  constructor(
    private store: Store<{ projects: Project[] }>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
