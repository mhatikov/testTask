import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-error',
  templateUrl: './notification-error.component.html',
  styleUrls: ['./notification-error.component.scss']
})
export class NotificationErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() message: string = '';
  @Output() closeWindow = new EventEmitter<boolean>();

  closeError(): void{
    this.closeWindow.emit(false);
  }
}
