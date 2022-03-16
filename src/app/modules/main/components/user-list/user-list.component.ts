import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { delayWhen, EMPTY, finalize, iif, interval, map, mergeWith, Observable, retryWhen, Subscription, switchMap, tap, timer } from 'rxjs';
import { getCookie } from 'src/app/models/Cookies/cookiesFunction';
import { ServerError } from 'src/app/models/Errors/errors';
import { Customer } from 'src/app/models/interfaces/customer.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { UserListService } from 'src/app/services/user-list.service';
import { NgForm } from '@angular/forms';
import { UpdateCustomer } from 'src/app/models/interfaces/updateCustomer.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(
    private _userListService: UserListService,
    private _filtersService: FiltersService
  ) { }

  customersStream: Subscription;
  updateCustomerStream: Subscription;

  lastFilterKey: null|number;
  displayLoader: boolean = true;
  stopAutoReconnect: boolean = true;
  displayModalWindow: boolean = false;
  displayModalWinodwLoader: boolean = false;

  customers: Customer[];
  selectedCustomer: Customer;
  indexSelectedCustomer: number;

  @Output() errorServer = new EventEmitter<string>();

  private _getCustomersPipe$(observer: Observable<ServerError|Customer[]>): Observable<Customer[]>{
    return observer.pipe(
      map(result => {
        if(!Array.isArray(result)) {
          this.errorServer.emit('Reconnect...');
          throw new ServerError(result.message);
        }
        return this._userListService.getCustomersMap(result);
      }),
      retryWhen(err => err.pipe(
        delayWhen(() => timer(5000)),
      )),
    )
  }

  private _createAutoReconnectionCustomers$(){
   return interval(5000).pipe(
      switchMap(() => {
        return iif(
          () => this.stopAutoReconnect,
          EMPTY,
          this._userListService.getCustomersToFiltersKey$(getCookie('authToken') as string, this.lastFilterKey),
        )
      }),
      map(result => {
        if(!Array.isArray(result) || this.stopAutoReconnect) return EMPTY;
        return this._userListService.getCustomersMap(result);
      })
    )
  }

  showModalWindow(indexCustomer: number){
    this.stopAutoReconnect = true;
    this.displayModalWindow = true;
    this.indexSelectedCustomer = indexCustomer;
    this.selectedCustomer = JSON.parse(JSON.stringify(this.customers[indexCustomer]));
  }

  hideModalWindow(){
    this.stopAutoReconnect = false;
    this.displayModalWindow = false;
  }

  updateCustomer(form: NgForm){
    const updateCustomer: UpdateCustomer = {
      status: this.selectedCustomer.status,
      name: this.selectedCustomer.name,
      mname: this.selectedCustomer.mname,
      fname: this.selectedCustomer.fname,
    }
    if(form.valid){
      this._userListService.updateCustomerFromId$(getCookie('authToken') as string, this.selectedCustomer.id, updateCustomer)
        .pipe(
          tap((res: any) => {
            this.displayModalWinodwLoader = true;
            if(res.message) {
              this.errorServer.emit('Reupdating');
              throw new ServerError(res.message);
            }
            return res;
          }),
          retryWhen(err => err.pipe(
            delayWhen(() => timer(5000)),
          )),
          finalize(() => {
            this.hideModalWindow();
            this.displayModalWinodwLoader = false;
          }
          )
        )
        .subscribe(res => {
          this.customers[this.indexSelectedCustomer] = this._userListService.getCustomersMap([res])[0];
          console.log(res);
        });
    }
  }

  ngOnInit(): void {
    this.customersStream = this._filtersService.filterKey$
      .pipe(
        tap((res) => {
          this.displayLoader = true;
          this.stopAutoReconnect = true;
          this.lastFilterKey = res;
        }),
        switchMap(key => this._getCustomersPipe$(this._userListService.getCustomersToFiltersKey$(getCookie('authToken') as string, key))),
        mergeWith(this._createAutoReconnectionCustomers$()),
      )
      .subscribe(customers => {
        if(Array.isArray(customers)) this.customers = customers;
        this.displayLoader = false;
        this.stopAutoReconnect = false;
        console.log(this.customers);
      });
  }

  ngOnDestroy(): void {
    this.customersStream.unsubscribe();
    if(this.updateCustomerStream) this.updateCustomerStream.unsubscribe();
  }
}