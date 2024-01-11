import { User } from './user';
import { Reader } from './reader';

export interface AutoLogin {
  user: User;
  reader: Reader | undefined;
}
