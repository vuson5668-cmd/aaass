export interface UserCredentials {
  emailOrPhone: string;
  password?: string;
}

export interface SheetResponse {
  result: 'success' | 'error';
  message?: string;
}

export enum FormMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}
