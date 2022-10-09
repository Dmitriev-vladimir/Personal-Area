import {Component, Inject, OnInit} from '@angular/core';
import {IContact, IDialogData} from "../../shared/interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-contact',
  template: `
      <h3>{{title}}</h3>
    <form class="contact__form">
      <mat-form-field class="contact-full-width" appearance="fill">
        <mat-label>Имя контакта</mat-label>
        <input
          type="text"
          matInput
          placeholder="Input your name"
          [(ngModel)]="contactData.name"
          name="contactName"
          required
          #name="ngModel">

        <mat-error *ngIf="name.errors?.['required']">
          Поле обязательно для заполнения
        </mat-error>
      </mat-form-field>

      <mat-form-field class="contact-full-width" appearance="fill">
        <mat-label>Email</mat-label>
        <input
          type="email"
          matInput
          placeholder="Input your email"
          [(ngModel)]="contactData.email"
          name="email"
          required
          #email="ngModel">

        <mat-error *ngIf="email.errors?.['required']">
          Поле обязательно для заполнения
        </mat-error>
      </mat-form-field>

      <mat-form-field class="contact-full-width" appearance="fill">
        <mat-label>Phone number</mat-label>
        <input
          type="tel"
          matInput
          placeholder="Input your phone number"
          [(ngModel)]="contactData.tel"
          name="tel"
          required
          #tel="ngModel">

        <mat-error *ngIf="tel.errors?.['required']">
          Поле обязательно для заполнения
        </mat-error>
      </mat-form-field>

      <div class="contact__buttons">
        <button mat-raised-button color="accent" (click)="cancel()">Отмена</button>
        <button mat-raised-button color="primary" (click)="onSubmit()">Сохранить</button>

      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      width: 300px;
    }

    .contact-full-width {
      width: 100%;
    }

    .title-block {
      display: flex;
      justify-content: space-between;
    }

    .contact__buttons {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
    }
  `]
})
export class ContactComponent implements OnInit {

  contactData: IContact = {
    name: this.data.contact ? this.data.contact.name : '',
    email: this.data.contact ? this.data.contact.email : '',
    tel: this.data.contact ? this.data.contact.tel : '',
    id: this.data.contact ? this.data.contact.id : '',
  }

  title: string = this.data.method === 'POST' ? "Добавить контакт" : "Обновить контакт";


  constructor(
    public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDialogData) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close({contact: undefined})
  }

  onSubmit() {
    this.dialogRef.close({contact: this.contactData})
  }

}
