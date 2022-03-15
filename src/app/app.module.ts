import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationPageComponent } from './components/pages/authorization-page/authorization-page.component';
import { AuthorizationWindowComponent } from './components/authorization-window/authorization-window.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationErrorComponent } from './components/notification-error/notification-error.component';
import { MainPageComponent } from './modules/main/components/pages/main-page/main-page.component';
import { NavigationFiltersComponent } from './modules/main/components/navigation-filters/navigation-filters.component';
import { UserListComponent } from './modules/main/components/user-list/user-list.component';
import { AddCharPipe } from './pipes/add-char.pipe';
import { CharLimitPipe } from './pipes/char-limit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationPageComponent,
    AuthorizationWindowComponent,
    NotificationErrorComponent,
    MainPageComponent,
    NavigationFiltersComponent,
    UserListComponent,
    AddCharPipe,
    CharLimitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
