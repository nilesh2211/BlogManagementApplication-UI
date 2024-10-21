import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BlogApi } from "../api/blog.api";
import { Blog } from "../../models/blog";
import { BlogParams } from "../../models/blogParams";

@Injectable()
export class BlogService {

  constructor(
    private blogApi: BlogApi,
  ) {}

  getBlog(params: BlogParams): Observable<any> {
    return this.blogApi.getBlog(params);
  }

  createOrUpdateBlog(blog: Blog): Observable<any> {
    if (!blog.id) {
      return this.blogApi.createBlog(blog);
    } else {
      return this.blogApi.updateBlog(blog);
    }
  }

  deleteBlog(id: string): Observable<any> {
    return this.blogApi.deleteBlog(id);
  }
}
