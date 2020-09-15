import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONSTANT_URL } from 'src/app/constant/constant-rest';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T extends any> {

  BASE_URL = CONSTANT_URL.BASE_URL;

  constructor(
    public http: HttpClient,
    public URL: string
  ) {
    this.BASE_URL += URL;
  }

  public getAll(data: any): Observable<any> {
    let url = this.BASE_URL;
    let url_temp = url;
    if (data) {
      url += 'erasedList';
    }
    return this.http.get(url);
  }

  public getOne(id: any): Observable<any> {
    const url = this.BASE_URL + id;
    return this.http.get(url);
  }

  public save(data: T | any): Observable<any> {
    const url = this.BASE_URL;
    return this.http.post(url, data);
  }

  public update(data: T): Observable<any> {
    const url = this.BASE_URL;
    return this.http.put(url, data);
  }

  public patch(data: T): Observable<any> {
    const url = this.BASE_URL;
    return this.http.patch(url, data);
  }

  public delete(data: T): Observable<any> {
    const url = this.BASE_URL + 'delete';
    return this.http.put(url, data);
  }

  public deleteList(data: T | any): Observable<any> {
    const url = this.BASE_URL + 'deleteList';
    return this.http.put(url, data);
  }

  public erase(id: any): Observable<any> {
    const url = this.BASE_URL + 'deactivate';
    return this.http.put(url, id);
  }

  public eraseList(data: any): Observable<any> {
    const url = this.BASE_URL + 'deactivateList';
    return this.http.put(url, data);
  }

}
