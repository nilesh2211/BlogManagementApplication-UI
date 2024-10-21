import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./core/layout/layout.component";
import { AppGuard } from "./auth/guards/app.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "app",
    canActivate: [AppGuard],
    component: LayoutComponent,
    children: [
      {
        path: "blog",
        loadChildren: () =>
          import("./blog/blog.module").then((m) => m.BlogModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
