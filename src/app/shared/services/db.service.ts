import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IContact, IUser} from "../interfaces";
import {Observable, switchMap} from "rxjs";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  private get<T>(url:string): Observable<T> {
    return this.http.get<T>(url);
  }

  private post<T>(url:string, body: T): Observable<T> {
    return this.http.post<T>(url, body);
  }

  private put<T>(url:string, body: T): Observable<T> {
    return this.http.put<T>(url, body);
  }

  private delete<T>(url:string): Observable<T> {
    return this.http.delete<T>(url, {headers: {"Content-Type": "application/json"}});
  }

  getUser(login: string): Observable<IUser> {
    return this.get<IUser[]>(`http://localhost:3010/users`)
      .pipe(
        switchMap((data) => [...data]),
        filter((item:IUser) => item.name === login),
      );
  }

  getContactList(): Observable<Array<IContact>> {
    return this.get<Array<IContact>>('http://localhost:3010/contacts');
  }

  deleteUser(id: string) {
    return this.delete<IContact[]>(`http://localhost:3010/contacts/${id}`)
  }

  addContact(contact:IContact): Observable<IContact> {
    return this.post<IContact>('http://localhost:3010/contacts', contact);
  }

  updateContact(contact:IContact) {
    return this.put<IContact>(`http://localhost:3010/contacts/${contact.id}`, contact);
  }

  searchContacts(field: string, value: string) {
    return this.get<IContact[]>(`http://localhost:3010/contacts/?${field}_like=${value}`)
  }
}
