import { InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionAuthStrategy } from "./session-auth.strategy";
import { User } from "../../models/user";

export interface AuthStrategy<T> {
  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User>;
}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>(
  "AuthStrategy"
);

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
        return new SessionAuthStrategy();
    }
};
