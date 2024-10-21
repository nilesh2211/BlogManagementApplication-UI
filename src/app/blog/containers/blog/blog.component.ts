import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Subscription, of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
} from "rxjs/operators";

import {
  BlogDialogComponent,
  BlogDialogData,
  SubmitBlogCallback,
} from "../../components/blog-dialog/blog-dialog-component";
import { BlogService } from "../../services/blog.service";
import { SnackBarComponent } from "../../../shared/components/snackbar/snackbar.component";
import { Blog } from "../../../models/blog";
import { BlogParams } from "../../../models/blogParams";

@Component({
  selector: "blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("filter", { static: true }) filter: ElementRef;
  dataSource = new MatTableDataSource<Blog>([]);
  displayedColumns = ["created", "title", "desc", "actions"];
  keyupSubscription?: Subscription;
  isLoading = true;
  params: BlogParams = {
    limit: 1000000,  // TODO ?? Paging
    offset: 0,
    searchValue: '',
  };

  constructor(
    private blogService: BlogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadTable$().subscribe();
  }


  ngAfterViewInit() {
    this.keyupSubscription = fromEvent(this.filter.nativeElement, "keyup").pipe(
      debounceTime(1000),
      // map((event: Event) => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      tap(() => (this.isLoading = true)),
      switchMap((searchValue: any) => {
        var input = <HTMLInputElement>searchValue.srcElement;
        this.params.searchValue = input.value;
      
        return this.blogService.getBlog(this.params)
      }
      )
    ).subscribe((data: any) => {
      this.isLoading = false;
      if (data.success)
        this.dataSource.data = data.data;
      else
        this.showResultSnackbar(data.errorMessage);
    });
  }

  ngOnDestroy() {
    this.keyupSubscription?.unsubscribe();
  }

  openBlogDialog() {
    this.dialog.open<BlogDialogComponent, BlogDialogData>(
      BlogDialogComponent,
      {
        data: {

          callback$: this.getSubmitBlogCallback$(),
        },
        maxWidth: "100vw",
        maxHeight: "100vh",
        height: "100%",
        width: "100%",
      }
    );
  }

  loadTable$() {
    this.isLoading = true;
    return this.blogService.getBlog(this.params).pipe(
      map((data: any) => {
        this.isLoading = false;
        if (data.success)
          this.dataSource.data = data.data;
        else
          this.showResultSnackbar(data.errorMessage);
      }),
      catchError((errorResponse) => {
        this.isLoading = false;
        this.showResultSnackbar("Unknown error");
        return of(errorResponse);
      })
    );
  }

  getLoadTableCallback$() {
    return () => this.loadTable$();
  }

  getSubmitBlogCallback$(): SubmitBlogCallback {
    return (blog: Blog) =>
      this.blogService.createOrUpdateBlog(blog).pipe(
        switchMap(() => this.loadTable$()),
        tap(() => this.showResultSnackbar("Success")),
        catchError((errorResponse) => {
          this.showResultSnackbar("Unknown error");
          return of(errorResponse);
        })
      );
  }

  private showResultSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message,
    });
  }
}
