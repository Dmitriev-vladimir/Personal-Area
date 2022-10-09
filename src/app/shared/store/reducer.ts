import {IState, IUser} from "../interfaces";
import {createReducer, on} from "@ngrx/store";
import {MyActions} from "./actions";


export const STORE_FEATURE_NAME = 'store';

const initialState: IState = {
  authorized: false,
  contacts: [],
  loginFailed: false
}



export const myReducer = createReducer(initialState,
    on(MyActions.setContactsToStore, (state: IState, {contacts: contactList}) => ({

        ...state,
        contacts: contactList

    })),
    on(MyActions.loginSuccess, (state:IState, data: IUser) => ({
        ...state,
        user: {
          name: data.name,
          role: data.role,
        },
      authorized: true,
      loginFailed: false
    })),
  on(MyActions.loginFailed, (state:IState) => ({
    ...state,
    authorized: false,
    user: {
      name: '',
      role: ''
    },
    loginFailed: true
  }))

  )
