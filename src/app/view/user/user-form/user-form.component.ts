import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractAlertService } from 'src/app/abstract/abstract-alert-service/abstract-alert.service';

import { AbstractFormDirective } from 'src/app/abstract/abstract-component/abstract-form';
import { AccessRole, User } from 'src/app/security/model/user.model';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends AbstractFormDirective<User, UserService> implements OnInit {

  public roles = AccessRole;

  constructor(
    service: UserService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    alertService: AbstractAlertService
  ) {
    super(service, User, router, activatedRoute, dialog, alertService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
