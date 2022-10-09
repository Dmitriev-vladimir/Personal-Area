import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {DbService} from "../shared/services/db.service";
import {Observable} from "rxjs";
import {IContact} from "../shared/interfaces";
import {MyActions} from "../shared/store/actions";
import {contacts, userRole} from "../shared/store/selectors";
import {MatDialog} from "@angular/material/dialog";
import {ContactComponent} from "./layout/contact.component";

@Component({
  selector: 'app-contacts',
  template: `
    <div class="title-block">
      <h2>Контакты</h2>
      <mat-form-field appearance="fill" class="search">
        <input
          type="text"
          matInput
          placeholder="Search"
          [(ngModel)]="searchString"
          name="search"

        (input)="logData(searchString)">

      </mat-form-field>
    </div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
      </ng-container>

      <ng-container matColumnDef="tel">
        <th mat-header-cell *matHeaderCellDef> Phone number </th>
        <td mat-cell *matCellDef="let element"> {{element.tel}} </td>
      </ng-container>

      <ng-container matColumnDef="buttons">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button
            mat-raised-button
            class="change-btn"
            (click)="openDialogUpdateContact(element)"
            [disabled]="(role$ | async) !== 'admin'">
            Изменить
          </button>
          <button
            mat-raised-button
            color="accent"
            class="delete-btn"
            (click)="deleteContact(element.id)"
            [disabled]="(role$ | async) !== 'admin'">
            Удалить
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <button
      mat-raised-button
      class="add-btn"
      color="primary"
      (click)="openDialogAddContact()"
      [disabled]="(role$ | async) !== 'admin'">
      Добавить контакт
    </button>


  `,
  styles: [`
    :host {
      display: block;
      max-width: 1600px;
      margin-inline: auto;
    }

    .title-block {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .search {
      display: block;
      width: 400px;
    }

    table {
      width: 100%;
    }

    .change-btn {
      margin-right: 15px;
    }

    .add-btn {
      padding: 8px 24px;
      margin-top: 20px;
    }
  `]
})
export class ContactsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'tel', 'buttons'];
  contactList$: Observable<IContact[]> = this.store$.select(contacts);
  dataSource = this.contactList$;

  searchString: string = '';

  role$ = this.store$.select(userRole);

  constructor(
    private store$: Store,
    private db: DbService,
    public dialog: MatDialog
  ) {
    this.store$.dispatch(MyActions.setContacts());
  }

  ngOnInit(): void {
  }

  deleteContact(id:string) {
    this.db.deleteUser(id);
    this.store$.dispatch(MyActions.deleteContact({id}));
  }

  openDialogAddContact() {
    const dialogToAddContact = this.dialog.open(
      ContactComponent,
      {data: {
        method: "POST"
        }}
    );

    dialogToAddContact.afterClosed().subscribe(result => {

      if (result.contact) {
        const newContact = {
          ...result.contact,
          id: this.getRandomId()
        }
        this.store$.dispatch(MyActions.addContact({contact: newContact}))
      }
    });

  }

  openDialogUpdateContact(contact: IContact) {
    const dialogToUpdateContact = this.dialog.open(
      ContactComponent,
      {data: {
        method: "PUT",
        contact: contact
      }}
    );

    dialogToUpdateContact.afterClosed().subscribe(result => {
      if (result.contact) {
        this.store$.dispatch(MyActions.updateContact({contact: result.contact}))
      }
    });

  }

  getRandomId(): string {
    return (Math.round(Math.random() * 2000 ** 8)).toString().substring(2, 9);
  }

  logData(value: string) {
    this.store$.dispatch(MyActions.search({value}))
  }

}
