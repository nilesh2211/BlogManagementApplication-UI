import { Component, Inject, OnInit } from "@angular/core";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { BlogService } from "../../services/blog.service";

export interface DeleteBlogData {
  blogId: string;
  callback$: DeleteBlogCallback;
}

export type DeleteBlogCallback = () => Observable<void>;

@Component({
  selector: "confirm-delete",
  templateUrl: "confirm-delete.template.html",
})
export class ConfirmDeleteComponent implements OnInit {
  inProgress: boolean;
  confirmText: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ConfirmDeleteComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: DeleteBlogData,
    private blogSevice: BlogService
  ) {}

  ngOnInit() {
    this.inProgress = false;
    this.confirmText = "Confirm";
  }

  confirm(): void {
    this.inProgress = true;
    this.confirmText = "Please wait...";
    this.blogSevice
      .deleteBlog(this.data.blogId)
      .pipe(switchMap(() => this.data.callback$()))
      .subscribe(() => this.bottomSheetRef.dismiss());
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }
}
