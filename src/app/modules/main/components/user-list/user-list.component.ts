import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { delayWhen, EMPTY, iif, interval, map, Observable, retryWhen, Subscription, switchMap, tap, timer } from 'rxjs';
import { getCookie } from 'src/app/models/Cookies/cookiesFunction';
import { ServerError } from 'src/app/models/Errors/errors';
import { Customer } from 'src/app/models/interfaces/customer.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(
    private _userListService: UserListService,
    private _filtersService: FiltersService,
  ) { }

  customersStream: Subscription;
  updateCustomersStream: Subscription;

  lastFilterKey: null|number;
  displayLoader: boolean = true;
  stopAutoUpdating: boolean = true;

  customers: Customer[];

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
        tap(() => {
          console.log('reconnect...');
        })
      ))
    )
  }
  private _createUpdateCustomers$(){
   return interval(5000).pipe(
      switchMap(() => {
        return iif(
          () => this.stopAutoUpdating,
          EMPTY,
          this._userListService.getCustomersToFiltersKey$(getCookie('authToken') as string, this.lastFilterKey),
        )
      }),
      map(result => {
        if(!Array.isArray(result) || this.stopAutoUpdating) return EMPTY;
        return this._userListService.getCustomersMap(result);
      })
    )
  }

  ngOnInit(): void {
    this.customersStream = this._filtersService.filterKey$
      .pipe(
        tap((res) => {
          this.displayLoader = true;
          this.stopAutoUpdating = true;
          this.lastFilterKey = res;
        }),
        switchMap(key => this._getCustomersPipe$(this._userListService.getCustomersToFiltersKey$(getCookie('authToken') as string, key))),
      )
      .subscribe(customers => {
        this.customers = customers;
        this.displayLoader = false;
        this.stopAutoUpdating = false;
        console.log(this.customers);
      });

    this.updateCustomersStream = this._createUpdateCustomers$()
      .subscribe(res =>{
        if(Array.isArray(res)) this.customers = res;
        console.log(res);
      })
  }

  ngOnDestroy(): void {
    this.updateCustomersStream.unsubscribe();
    this.customersStream.unsubscribe();
  }
}