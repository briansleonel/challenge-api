import { Role } from "../enums/role.enum";

export interface IActiveUser {
  sub: string;
  email: string;
  role: Role;
}