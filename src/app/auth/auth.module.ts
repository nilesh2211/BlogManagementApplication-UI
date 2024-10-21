import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";

import { AuthRoutingModule } from "./auth-routing.module";
import { authStrategyProvider } from "./services/auth.strategy";
import { AuthInterceptor } from "./auth.interceptor";
import { LoginComponent } from "./containers/login/login.component";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    authStrategyProvider,
  ],
})
export class AuthModule {}
