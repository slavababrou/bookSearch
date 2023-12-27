export interface Reader {
  id?: number;
  userId?: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phoneNumber: string | null;
  male: string | null;
  age: number | null;
  adress: string | null;
}
