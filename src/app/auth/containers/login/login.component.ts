import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./../../../shared/components/snackbar/snackbar.component";
import { AuthService } from "../../services/auth.service";
import { LoginRequest } from "../../../models/loginRequest";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./../auth.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest: LoginRequest;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginRequest = new LoginRequest();
    this.loginForm = this.formBuilder.group({
      userName: [this.loginRequest.userName, Validators.required],
      password: [this.loginRequest.password, Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    const loginRequest = Object.assign(new LoginRequest(), this.loginForm.value);
   
    this.authService.login(loginRequest)
      .subscribe({
        next: user => {
          this.router.navigate(["/app/blog"]);
        },
        error: error => {
          console.log(error);
          this.showResultSnackbar(error.error ?? "Unknown error");
        }
      });

  }

  private showResultSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message,
    });
  }
}
