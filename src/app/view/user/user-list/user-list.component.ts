import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AbstractListDirective } from 'src/app/abstract/abstract-component/abstract-list';
import { UserService } from '../user-service/user.service';
import { User } from 'src/app/security/model/user.model';
import { AbstractAlertService } from 'src/app/abstract/abstract-alert-service/abstract-alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractListDirective<User, UserService> implements OnInit {

  constructor(service: UserService, router: Router, dialog: MatDialog, alertService: AbstractAlertService
    ) {
    super(service, router, dialog, alertService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}

@Pipe({ name: 'enumAccessRole' })
export class AccessRolePipe implements PipeTransform {
  transform(statusName: string): string {

    switch (statusName) {
      case 'ADMIN':
        return 'Administrador';

      default:
        break;
    }
  }
}


