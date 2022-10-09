import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { IUserLogin} from "../shared/interfaces";
import {Store} from "@ngrx/store";
import {MyActions} from "../shared/store/actions";
import {login} from "../shared/store/selectors";

@Component({
  selector: 'app-login',
  template: `
    <h2>Вход</h2>
    <form class="example-form" (ngSubmit)="onSubmit()">
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Login</mat-label>
        <input
          type="text"
          matInput
          placeholder="Input your login name"
          [(ngModel)]="loginData.login"
          name="login"
          required
          #login="ngModel">

        <mat-error *ngIf="login.errors?.['required']">
          Login is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Password</mat-label>
        <input
          type="password"
          matInput
          placeholder="Input your password"
          [(ngModel)]="loginData.password"
          name="password"
          required
          #password="ngModel">

        <mat-error *ngIf="password.errors?.['required']">
          Password is <strong>required</strong>
        </mat-error>
      </mat-form-field>


      <button mat-raised-button color="primary">Войти</button>

      <mat-error *ngIf="loginFailed$ | async">
        Введены неверные значения логин или пороля
      </mat-error>

    </form>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 600px;
      margin-inline: auto;
      margin-top: 50px;
    }

    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }

  `]
})
export class LoginComponent implements OnInit {

  loginData: IUserLogin = {
    login: '',
    password: ''
  }

  loginFailed$ = this.store$.select(login)

  constructor(
    private router: Router,

    private store$: Store
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store$.dispatch(MyActions.login(this.loginData));

    this.router.navigateByUrl('/contacts').then()
  }
}
