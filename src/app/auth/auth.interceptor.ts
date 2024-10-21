import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "./services/auth.service";
import { SessionAuthStrategy } from "./services/session-auth.strategy";
import { AUTH_STRATEGY } from "./services/auth.strategy";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTH_STRATEGY) private token: SessionAuthStrategy
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token && this.token.getToken()) {
      request = this.addToken(request, this.token.getToken()!);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.doLogoutAndRedirectToLogin();
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
