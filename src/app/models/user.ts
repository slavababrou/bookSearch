export interface User {
  id: number;
  username: string;
  password: string;
  registrationDate: string;
  email: string;
  roleId: number;

  readerId: number | null;
}
