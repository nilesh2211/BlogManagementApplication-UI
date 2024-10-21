import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { config} from "../../core/config";
import { AuthStrategy, AUTH_STRATEGY } from "./auth.strategy";
import { LoginRequest } from "../../models/loginRequest";
import { User } from "../../models//user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public readonly INITIAL_PATH = "/app/blog";
  public readonly LOGIN_PATH = "/login";

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) {}


  login(loginRequest: LoginRequest): Observable<any> {
    return this.http
      .post<any>(`${config.apiUrl}/account/login`, loginRequest)
      .pipe(tap((data) => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http
      .get<any>(`${config.apiUrl}/account/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User> {
    return this.auth.getCurrentUser();
  }

  getUserRole$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(map((user) => user.role!));
  }

  getUserEmail$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(map((user) => user.email!));
  }

  getUserName$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(map((user) => user.name!));
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(["/login"]);
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }
}
