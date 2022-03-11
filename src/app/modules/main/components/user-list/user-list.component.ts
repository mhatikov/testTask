import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { getCookie } from 'src/app/models/Cookies/cookiesFunction';
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

  usersStream: Subscription;

  ngOnInit(): void {
   this.usersStream = this._filtersService.filterKey$
    .pipe(
      tap((res) => console.log('loader start!')),
      switchMap(key => this._userListService.getUsersToFiltersKey$(getCookie('authToken') as string, key)),
    )
    .subscribe(users => {
      console.log(users);
      console.log('loader end!')
    });
  }

  ngOnDestroy(): void {
    this.usersStream.unsubscribe(); 
  }
}
