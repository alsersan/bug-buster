import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProjectsService } from 'src/app/services/projects/projects.service';

import * as actions from '../actions/projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createProject),
      exhaustMap((action) =>
        this.projectsService.createProject(action.project).pipe(
          map((project) => actions.createProjectSuccess({ project })),
          catchError((error: any) => of(actions.createProjectFailure(error)))
        )
      )
    )
  );

  getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllprojects),
      exhaustMap(() =>
        this.projectsService.getAllProjects().pipe(
          map((projects) => actions.getAllprojectsSucess({ projects })),
          catchError((error: any) => of(actions.getAllprojectsFailure(error)))
        )
      )
    )
  );

  getProjectById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getProjectById),
      exhaustMap((action) =>
        this.projectsService.getProjectById(action.projectId).pipe(
          map((project) => actions.getProjectByIdSuccess({ project })),
          catchError((error: any) => of(actions.getProjectByIdFailure(error)))
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateProject),
      exhaustMap((action) =>
        this.projectsService
          .updateProject(action.projectId, action.update)
          .pipe(
            map((project) => actions.updateProjectSuccess({ project })),
            catchError((error: any) => of(actions.updateProjectFailure(error)))
          )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteProject),
      exhaustMap((action) =>
        this.projectsService.deleteProject(action.projectId).pipe(
          map((project) => actions.deleteProjectSuccess({ project })),
          catchError((error: any) => of(actions.deleteProjectFailure(error)))
        )
      )
    )
  );
}
