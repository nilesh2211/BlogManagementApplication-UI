import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { BlogRoutingModule } from "./blog-routing.module";
import { SharedModule } from "../shared/shared.module";
import { BlogApi } from "./api/blog.api";
import { BlogService } from "./services/blog.service";
import { BlogComponent } from "./containers/blog/blog.component";
import { BlogTableComponent } from "./components/blog-table/blog-table.component";
import { ConfirmDeleteComponent } from "./components/confirm-delete/confirm-delete.component";
import { BlogDialogComponent } from "./components/blog-dialog/blog-dialog-component";

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, BlogRoutingModule],
  declarations: [
    BlogComponent,
    BlogTableComponent,
    ConfirmDeleteComponent,
    BlogDialogComponent,
  ],
  providers: [BlogService, BlogApi],
})
export class BlogModule {}
