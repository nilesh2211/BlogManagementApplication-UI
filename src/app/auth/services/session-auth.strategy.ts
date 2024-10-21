import { Observable, of } from "rxjs";
import { User } from "../../models/user";
import { AuthStrategy } from "./auth.strategy";

export class SessionAuthStrategy implements AuthStrategy<User> {
  private loggedUser?: User;
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly CURRENT_USER = "CURRENT_USER";

  constructor() { }

  doLoginUser(user: User): void {
    this.loggedUser = user;
    localStorage.setItem(this.JWT_TOKEN, user.token!);
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  doLogoutUser(): void {
    this.loggedUser = undefined
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.CURRENT_USER);
  }

  getCurrentUser(): Observable<User> {
    const user = localStorage.getItem(this.CURRENT_USER);
    if (user)
      this.loggedUser = JSON.parse(user);
    return of(this.loggedUser!);
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
