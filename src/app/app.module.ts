import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationPageComponent } from './components/pages/authorization-page/authorization-page.component';
import { AuthorizationWindowComponent } from './components/authorization-window/authorization-window.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationErrorComponent } from './components/notification-error/notification-error.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationPageComponent,
    AuthorizationWindowComponent,
    NotificationErrorComponent
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
