import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delayWhen, map, Observable, retryWhen, tap, timer } from 'rxjs';
import { ServerError } from '../models/Errors/errors';
import { Customer } from '../models/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private _http: HttpClient,
  ) { }

  getAllUsersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get('https://bumagi-frontend-test.herokuapp.com/users', {
      headers: {
        Authorization: token,
      }
    }) as Observable<ServerError|Customer[]>;
  }

  getAllBlockedUsersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get('https://bumagi-frontend-test.herokuapp.com/users?status=2', {
      headers: {
        Authorization: token,
      }
    }) as Observable<ServerError|Customer[]>;
  }

  getAllActiveUsersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get('https://bumagi-frontend-test.herokuapp.com/users?status=0', {
      headers: {
        Authorization: token,
      }
    }) as Observable<ServerError|Customer[]>;
  }

  getUsersToFiltersKey$(token: string, filtersKey: number|null): Observable<ServerError|Customer[]>{
    if(filtersKey === 0) return this._getUsersPipe(this.getAllActiveUsersList$(token));
    if(filtersKey === 2) return this._getUsersPipe(this.getAllBlockedUsersList$(token));
    return this._getUsersPipe(this.getAllUsersList$(token));
  }

  private _getUsersPipe(observer: Observable<ServerError|Customer[]>): Observable<Customer[]>{
    return observer.pipe(
      map(result => {
        if(!Array.isArray(result)){
          throw new ServerError(result.message);
        }
        return result.sort((a,b) => {
          if(a.id > b.id) return -1;
          if(a.id < b.id) return 1;
          return 0
        }).reverse();
      }),
      retryWhen(err => err.pipe(
        delayWhen(() => timer(5000)),
        tap(() => console.log('reconnect...'))
      ))
    )
  }
}
