import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
  ) { }

  login(data: User): Observable<any>{
    return this._http.post('https://bumagi-frontend-test.herokuapp.com/auth',data, {observe: 'response'});
  }
}
