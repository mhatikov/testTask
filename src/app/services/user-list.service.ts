import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private _http: HttpClient,
  ) { }

  getUserList(token: string){
    return this._http.get('https://bumagi-frontend-test.herokuapp.com/users', {
      headers: {
        Authorization: token,
      }
    });
  }
}
