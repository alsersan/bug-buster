import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NEVER, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import * as actions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store: Store<{ projects: Project[] }>,
    private router: Router
  ) {}

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createProject),
      exhaustMap((action) =>
        this.projectsService.createProject(action.project).pipe(
          map((project) => {
            this.router.navigateByUrl('/projects');
            return actions.createProjectSuccess({ project });
          }),
          catchError((error: any) => of(actions.createProjectFailure(error)))
        )
      )
    )
  );

  getAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllProjects),
      exhaustMap(() =>
        this.projectsService.getAllProjects().pipe(
          map((projects) => actions.getAllProjectsSucess({ projects })),
          catchError((error: any) => of(actions.getAllProjectsFailure(error)))
        )
      )
    )
  );

  getProjectById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getProjectById),
      concatLatestFrom(() => {
        return this.store.select('projects');
      }),
      exhaustMap(([action, projects]) => {
        const exists = projects.some(
          (el: Project) => el._id === action.projectId
        );
        if (exists) {
          return NEVER;
        } else {
          return this.projectsService.getProjectById(action.projectId).pipe(
            map((project) => {
              return actions.getProjectByIdSuccess({ project });
            }),
            catchError((error: any) => of(actions.getProjectByIdFailure(error)))
          );
        }
      })
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
            catchError((error: any) => {
              console.log(error);
              return of(actions.updateProjectFailure(error));
            })
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
