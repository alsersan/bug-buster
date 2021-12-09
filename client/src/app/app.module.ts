import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { User } from './models/user.model';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { checkLogin } from './store/login/login.actions';
import { LoginEffects } from './store/login/login.effects';
import { loginReducer } from './store/login/login.reducers';
import { ProjectsEffects } from './store/projects/projects.effects';
import { projectsReducer } from './store/projects/projects.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot({
      projects: projectsReducer,
      loguedInUser: loginReducer,
    }),
    EffectsModule.forRoot([ProjectsEffects, LoginEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<{ loguedInUser: User }>) => {
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
