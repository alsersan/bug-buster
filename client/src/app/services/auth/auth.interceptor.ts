import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    // Cloudinary (cloud image hosting) expects no headers
    if (jwtToken && req.url !== environment.uploadImgUrl) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `${jwtToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
