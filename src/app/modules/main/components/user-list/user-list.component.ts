import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { delayWhen, map, Observable, retryWhen, Subscription, switchMap, tap, timer } from 'rxjs';
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
  lastFilterKey: null|number;
  displayLoader: boolean = true;

  customers: Customer[];

  @Output() errorServer = new EventEmitter<string>();

  private _getUsersPipe$(observer: Observable<ServerError|Customer[]>): Observable<Customer[]>{
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
        tap(() => {
          console.log('reconnect...');
          this.errorServer.emit('Reconnect');
        })
      ))
    )
  }

  ngOnInit(): void {
   this.customersStream = this._filtersService.filterKey$
    .pipe(
      tap((res) => {
        this.displayLoader = true;
        this.lastFilterKey = res;
      }),
      switchMap(key => this._getUsersPipe$(this._userListService.getUsersToFiltersKey$(getCookie('authToken') as string, key))),
    )
    .subscribe(customers => {
      this.customers = customers;
      this.displayLoader = false;
    });
  }

  ngOnDestroy(): void {
    this.customersStream.unsubscribe(); 
  }
}
