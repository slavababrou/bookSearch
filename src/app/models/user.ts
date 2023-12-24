export interface User {
  id: number;
  username: string;
  password: string;
  registrationDate: string;
  email: string;
  phoneNumber: string | null;
  adress: string | null;
}
