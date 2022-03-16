import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_CUSTOMERS } from '../models/Constants/Addresses';
import { ServerError } from '../models/Errors/errors';
import { Customer } from '../models/interfaces/customer.interface';
import { UpdateCustomer } from '../models/interfaces/updateCustomer.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private _http: HttpClient,
  ) { }

  getAllCustomersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get<ServerError|Customer[]>(HTTP_CUSTOMERS, {
      headers: {
        Authorization: token,
      }
    });
  }

  getAllBlockedCustomersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get<ServerError|Customer[]>(`${HTTP_CUSTOMERS}?status=2`, {
      headers: {
        Authorization: token,
      }
    });
  }

  getAllActiveCustomersList$(token: string): Observable<ServerError|Customer[]>{
    return this._http.get<ServerError|Customer[]>(`${HTTP_CUSTOMERS}?status=0`, {
      headers: {
        Authorization: token,
      }
    });
  }

  getCustomersToFiltersKey$(token: string, filtersKey: number|null): Observable<ServerError|Customer[]>{
    if(filtersKey === 0) return this.getAllActiveCustomersList$(token);
    if(filtersKey === 2) return this.getAllBlockedCustomersList$(token);
    return this.getAllCustomersList$(token);
  }

  updateCustomerFromId$(token: string,id: number, data: UpdateCustomer){
    const json = JSON.stringify(data);
    return this._http.patch(`${HTTP_CUSTOMERS}/${id}`, json, {
      headers: {
        Authorization: token,
      }
    });
  }

  getCustomersMap(res: Customer[]){
    return res.map((customer)=>{
      let newCustomer = customer;
      newCustomer.balance = Number(customer.balance.toFixed(2));
      const update = Math.ceil((new Date().getTime() - new Date(Date.parse(customer.lastUpdatedAt)).getTime()) / 1000);
      newCustomer.lastUpdatedAt = (update < 0) ? String(0) : String(update);
      newCustomer.avatar = `../../../../../assets/images${newCustomer.avatar}`;
      return newCustomer;
    }).sort((a,b) => {
      if(a.id > b.id) return -1;
      if(a.id < b.id) return 1;
      return 0
    }).reverse();
  }
}