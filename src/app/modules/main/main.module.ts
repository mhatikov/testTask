import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { NavigationFiltersComponent } from './components/navigation-filters/navigation-filters.component';


@NgModule({
  declarations: [
    MainComponent,
    MainPageComponent,
    NavigationFiltersComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
