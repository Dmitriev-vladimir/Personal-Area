import { Injectable } from '@angular/core';
import {IUserLogin} from "../interfaces";
import {DbService} from "./db.service";
import {Store} from "@ngrx/store";
import {authorized} from "../store/selectors";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authorized$: Observable<boolean> = this.store$.select(authorized)


  constructor(private db: DbService, private store$: Store) { }


  login(data: IUserLogin) {
      return this.db.getUser(data.login);
  }


}
