import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { AccessRolePipe, UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/app/material.module';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    AccessRolePipe
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],

  providers: [
    AccessRolePipe
  ]
})
export class UserModule { }
