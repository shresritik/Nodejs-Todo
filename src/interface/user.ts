import { ROLE } from "../enum";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: ROLE[];
}
