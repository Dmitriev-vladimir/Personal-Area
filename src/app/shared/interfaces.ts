export interface IUserLogin {
  login: string,
  password: string
}

export interface IState {
  authorized: boolean,
  loginFailed?: boolean,
  user?: IUser,
  contacts: IContact[]
}

export interface IUser {
  name: string,
  role: string,
  password?: string
}

export interface IContactData {
  name: string,
  email: string,
  tel: string
}

export interface IContact extends IContactData{
  id: string
}

export interface IDialogData {
  contact?: IContact,
  method: "POST" | "PUT"
}


