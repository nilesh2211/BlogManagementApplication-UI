import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { config } from "../../core/config";
import { Blog } from "../../models/blog";
import { BlogParams } from "../../models/blogParams";

@Injectable()
export class BlogApi {
  private readonly API_URL = `${config.apiUrl}`;

  constructor(private http: HttpClient) {}

  getBlog(params: BlogParams): Observable<any> {
    return this.http.get<Blog[]>(
      `${this.API_URL}/blogs?limit=${params.limit}&offset=${params.offset}&searchValue=${params.searchValue}`
    );
  }

  createBlog(blog: Blog): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/blog`, blog);
  }

  updateBlog(blog: Blog): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/blog`, blog);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/blog/${id}`);
  }
}
