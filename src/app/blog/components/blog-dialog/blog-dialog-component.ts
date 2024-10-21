import { Component, Inject, ViewEncapsulation, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { Blog } from "../../../models/blog";

export interface BlogDialogData {
  blog?: Blog;
  callback$: SubmitBlogCallback;
}

export type SubmitBlogCallback = (blog: Blog) => Observable<void>;

@Component({
  selector: "blog-dialog",
  templateUrl: "blog-dialog.component.html",
  styleUrls: ["blog-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDialogComponent implements OnInit {
  blogForm: FormGroup;
  blog: Blog;
  submitText: string;
  inProgress: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogDialogData
  ) {}

  ngOnInit() {
    this.inProgress = false;
    this.submitText = this.blog ? "Update" : "Save";
    this.blog = this.data.blog ?? new Blog();
   
    this.blogForm = this.fb.group({
      id: [this.blog.id],
      title: [this.blog.title, Validators.required],
      desc: [this.blog.desc, Validators.required],
    });
  }

  submit() {
    this.inProgress = true;
    this.submitText = "Please wait...";
    const newBlog = Object.assign(new Blog(), this.blogForm.value);
    this.data.callback$(newBlog).subscribe(() => this.dialogRef.close());
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
