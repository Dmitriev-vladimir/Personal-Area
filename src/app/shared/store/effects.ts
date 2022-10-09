import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import {map, switchMap, mergeMap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {MyActions} from "./actions";
import {DbService} from "../services/db.service";
import {Store} from "@ngrx/store";

@Injectable()
export class StoreEffects {

  auth$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.login),
    switchMap(login => this.auth.login(login)
      .pipe(
        map(user => {
            return user.password === login.password ? MyActions.loginSuccess(user) :  MyActions.loginFailed()
        })
      )
    )
  ))

  getContacts$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.setContacts),
    switchMap(() => this.db.getContactList()
      .pipe(
        map(list => {
          return MyActions.setContactsToStore({contacts: list});
        })
      ))
  ))

  addContact$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.addContact),
    switchMap((contact) => this.db.addContact(contact.contact)
      .pipe(
        map(() => {
          return MyActions.setContacts()
        })
      ))
  ))

  updateContact$ = createEffect(() => this.actions$.pipe(
      ofType(MyActions.updateContact),
      switchMap((contact) => this.db.updateContact(contact.contact)
        .pipe(
          map(() => {
            return MyActions.setContacts()
          })
        ))
  ))

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.deleteContact),
    switchMap((id) => this.db.deleteUser(id.id)
      .pipe(
        map(() => {
          return MyActions.setContacts();
        })
      ))

  ))

  search$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.search),
    mergeMap((value) => {
      const searchName = this.db.searchContacts('name', value.value)
      const searchEmail = this.db.searchContacts('email', value.value)
      const searchTel = this.db.searchContacts('tel', value.value)

      return forkJoin([searchName, searchEmail, searchTel])
    }),
    map(([name, email, tel]) => {
      const newContacts = [...name, ...email, ...tel];
      const idArray = [...new Set(newContacts.map(elem => elem.id))];
      const resArray = idArray.map(id =>  newContacts.filter(contact => contact.id === id)[0])

      return MyActions.setContactsToStore({contacts: resArray})
    })
  ));

  constructor(
    private store$: Store,
    private actions$: Actions,
    private auth: AuthService,
    private db: DbService
    ) {}

}
