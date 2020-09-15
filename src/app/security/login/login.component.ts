import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { SpinnerComponent } from 'src/app/component/spinner/spinner.component';
import { toast } from 'src/app/constant/constant-message';
import { AuthenticationService } from '../helpers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  username: string;
  password: string;

  public loading: any;
  public durationInSeconds = 5;
  error: any;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  submitCredentials() {
    this.loading = this.spinner();
    this.authenticationService.login(this.username, this.password).pipe(first()).subscribe(
      success => {
        this.router.navigate([this.returnUrl]);
        setTimeout(() => {
          this.loading.close();
        }, 500);
        this.toast(toast.welcome, toast.action);

      }, error => {
        setTimeout(() => {
          this.loading.close();
        }, 500);


        this.toast(toast.error_login, toast.action);
      })
  }

  toast(message: string, action: string) {
    this.snack.open(message, action, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  spinner() {
    return this.dialog.open(SpinnerComponent, {
      width: '100%',
      height: '100%',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'panel',
    });
  }

}
