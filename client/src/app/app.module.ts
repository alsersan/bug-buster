import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserState } from './models/user.model';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { checkLogin } from './store/auth/auth.actions';
import { LoginEffects } from './store/auth/auth.effects';
import { authReducer, clearState } from './store/auth/auth.reducers';
import { CommentsEffects } from './store/comments/comments.effects';
import { ProjectsEffects } from './store/projects/projects.effects';
import { projectsReducer } from './store/projects/projects.reducer';
import { TicketsEffects } from './store/tickets/tickets.effects';
import { UsersEffects } from './store/users/users.effects';
import { usersReducer } from './store/users/users.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        projects: projectsReducer,
        users: usersReducer,
        loguedInUser: authReducer,
      },
      { metaReducers: [clearState] }
    ),
    EffectsModule.forRoot([
      ProjectsEffects,
      UsersEffects,
      LoginEffects,
      TicketsEffects,
      CommentsEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<{ loguedInUser: UserState }>) => {
        return () => {
          store.dispatch(checkLogin());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
