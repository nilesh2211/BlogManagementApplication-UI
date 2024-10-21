import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SharedModule } from "./../shared/shared.module";
import { LayoutComponent } from "./layout/layout.component";
import { HttpErrorInterceptor } from "./error.interceptor";
import { HttpErrorHandler } from "./error.handler";
import { ConfigProvider } from "./config.provider";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    SharedModule,
    RouterModule,
    MatNativeDateModule,
  ],
  declarations: [LayoutComponent],
  providers: [
    ConfigProvider,
    HttpErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  exports: [LayoutComponent],
})
export class CoreModule {}
