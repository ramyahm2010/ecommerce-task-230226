import { ROLE } from '../enums/role.enum';

export interface User {
  username: string;
  password?: string;
  role: ROLE.USER | ROLE.ADMIN;
}
