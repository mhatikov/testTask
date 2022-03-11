import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

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
