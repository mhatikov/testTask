import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }

  filterKey$: Subject<number|null> = new Subject();

  setFilterKey(key: number|null): void{
    this.filterKey$.next(key);
  }

  completeFilterKey(): void{
    this.filterKey$.complete();
  }
}
