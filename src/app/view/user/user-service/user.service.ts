import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AbstractService } from 'src/app/abstract/abstract-service/abstract.service';
import { CONSTANT_URL } from 'src/app/constant/constant-rest';
import { User } from '../user-model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {

  constructor(http: HttpClient) {
    super(http, CONSTANT_URL.USER);
  }

}
