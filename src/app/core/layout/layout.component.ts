import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  Router,
} from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements AfterViewInit {
  public loadingRoute = false;
  public userName$: Observable<string>;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    this.userName$ = this.authService.getUserName$();
    iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl("assets/edit.svg")
    );
    iconRegistry.addSvgIcon(
      "remove",
      sanitizer.bypassSecurityTrustResourceUrl("assets/remove.svg")
    );
  }
 

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([this.authService.LOGIN_PATH]);
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
