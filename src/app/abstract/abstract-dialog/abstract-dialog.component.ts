import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abstract-dialog',
  templateUrl: './abstract-dialog.component.html',
  styleUrls: ['./abstract-dialog.component.scss']
})
export class AbstractDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AbstractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
