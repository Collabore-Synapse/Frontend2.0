import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.API)) {
      return this.authService.getToken().pipe(
        switchMap((token) => {
          if (token) {
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
          }
          return next.handle(request);
        })
      );
    }

    return next.handle(request);
  }
}
