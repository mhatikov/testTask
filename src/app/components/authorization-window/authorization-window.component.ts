import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, Subscription } from 'rxjs';
import { getCookie, setCookie } from 'src/app/models/Cookies/cookiesFunction';
import { AuthError } from 'src/app/models/Errors/errors';
import { User } from 'src/app/models/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorization-window',
  templateUrl: './authorization-window.component.html',
  styleUrls: ['./authorization-window.component.scss']
})
export class AuthorizationWindowComponent implements OnInit, OnDestroy {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  visiblePassword: boolean = false;

  displayLoader: boolean = false;

  authStream: Subscription;

  @Output() errorLogin = new EventEmitter<string>();

  formValues: User = {
    'login': '',
    'password' : '',
  }

  switchTypePassword(): void{
    this.visiblePassword = !this.visiblePassword;
  }

  onSubmit(form: NgForm){
    if(form.valid) {
      this.displayLoader = true;

      this.authStream = this._auth.login(this.formValues)
      .pipe(
        catchError(err => of(new AuthError('Invalid login'))),
        finalize(() => this.displayLoader = false),
      )
      .subscribe(
        res => {
          if(res instanceof AuthError){
            this.errorLogin.emit(res.message);
          }else{
            setCookie('authToken', res.headers.get('Authorization'), {secure: true});
            this._router.navigateByUrl(`/main`);
          }
        }
      );
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authStream.unsubscribe();
  }

}