import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-navigation-filters',
  templateUrl: './navigation-filters.component.html',
  styleUrls: ['./navigation-filters.component.scss']
})
export class NavigationFiltersComponent implements OnInit,AfterContentInit {

  constructor(
    private _filterService: FiltersService
  ) { }

  activeFilter: number|null = null;

  navigate(ev: any): void{
    const valueFilter = ev.target.attributes["data-filtersetting"].value;
    this.activeFilter = valueFilter ? Number(valueFilter) : null;
    this._filterService.setFilterKey(this.activeFilter);
  }

  ngAfterContentInit(): void {
    this._filterService.setFilterKey(this.activeFilter);
  }

  ngOnInit(): void {
  }
}
