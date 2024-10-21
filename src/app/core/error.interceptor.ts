import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpErrorHandler } from "./error.handler";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private handler: HttpErrorHandler) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorMessage(error);
        return throwError(error);
      })
    );
  }


  private showErrorMessage(error: HttpErrorResponse) {
    this.handler.handleError(error);
  }
}
