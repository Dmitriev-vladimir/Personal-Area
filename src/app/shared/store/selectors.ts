import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IState} from "../interfaces";
import {STORE_FEATURE_NAME} from "./reducer";

export const state = createFeatureSelector<IState>(STORE_FEATURE_NAME)

export const user = createSelector(state, (state) => state.user)

export const userRole = createSelector(state, (state) => state.user?.role)

export const contacts = createSelector(state, (state) => state.contacts)

export const authorized = createSelector(state, (state) => state.authorized)

export const login = createSelector(state, (state) => state.loginFailed)

