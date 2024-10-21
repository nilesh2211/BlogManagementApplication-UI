import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { DataSource } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";

import {
  ConfirmDeleteComponent,
  DeleteBlogCallback,
  DeleteBlogData,
} from "../confirm-delete/confirm-delete.component";
import {
  BlogDialogComponent,
  SubmitBlogCallback,
  BlogDialogData,
} from "../blog-dialog/blog-dialog-component";
import { Blog } from "../../../models/blog";

@Component({
  selector: "blog-table",
  templateUrl: "./blog-table.component.html",
  styleUrls: ["./blog-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogTableComponent {
  @Input()
  dataSource: DataSource<Blog>;

  @Input()
  displayedColumns: string[];

  @Input()
  deleteCallback: DeleteBlogCallback;

  @Input()
  submitCallback: SubmitBlogCallback;

  constructor(private bottomSheet: MatBottomSheet, private dialog: MatDialog) {}

  edit(blog: Blog) {
    this.dialog.open<BlogDialogComponent, BlogDialogData>(
      BlogDialogComponent,
      {
        data: {
          blog: blog,
          callback$: this.submitCallback,
        },
        maxWidth: "100vw",
        maxHeight: "100vh",
        height: "100%",
        width: "100%",
      }
    );
  }

  confirmDelete(blogId: string) {
    this.bottomSheet.open<ConfirmDeleteComponent, DeleteBlogData>(
      ConfirmDeleteComponent,
      {
        data: {
          blogId: blogId,
          callback$: this.deleteCallback,
        },
      }
    );
  }
}
