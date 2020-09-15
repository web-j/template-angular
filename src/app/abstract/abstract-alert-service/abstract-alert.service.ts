import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from 'src/app/component/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class AbstractAlertService {

  constructor(
    private snack: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  public alertToast(message: string, action: string): void {
    this.snack.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  public spinner(): any {
    return this.dialog.open(SpinnerComponent, {
        width: '100%',
        height: '100%',
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'panel',
    });
}
}
