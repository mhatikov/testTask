import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {

  constructor() { }

  errorMesageString: string = '';
  displayErrorNotification: boolean = false;

  getError(errorMessage: string): void{
    this.errorMesageString = errorMessage;
    this.displayErrorNotification = true;
  }

  hideErrorNotification(status: boolean){
    this.displayErrorNotification = false;
  }

  ngOnInit(): void {
  }
}
