import {createAction, props} from "@ngrx/store";
import {IUser, IUserLogin, IContact} from "../interfaces";

export namespace MyActions {

  export const setContacts = createAction("SET_CONTACTS");

  export const setContactsToStore = createAction("SET CONTACTS TO STORE", props<{ contacts: IContact[] } >())

  export const login = createAction("LOGIN", props<IUserLogin>());

  export const loginSuccess = createAction("LOGIN SUCCESS", props<IUser>());

  export const loginFailed = createAction("LOGIN FAILED");

  export const addContact = createAction("ADD CONTACT", props<{ contact: IContact }>());

  export const updateContact = createAction("UPDATE CONTACT", props<{ contact: IContact }>())

  export const deleteContact = createAction("DELETE", props<{ id: string }>());

  export const search = createAction("SEARCH", props<{value: string}>())
}
