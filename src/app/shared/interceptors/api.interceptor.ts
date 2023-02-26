import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackService } from '../services/snack.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
    private _snack: SnackService,
    private _router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          (err.status === 403 || err.status === 401)
        ) {
          // logout and redirect to login page
          this._auth.removeUserFromLocal();
          this._router.navigate(['/auth']);
          return throwError(err);
        } else {
          // if error has status neither 401 nor 403 then just return this error
          this._snack.show('Error connecting to server !', 'error');
          return throwError(err);
        }
      })
    );
  }
}
