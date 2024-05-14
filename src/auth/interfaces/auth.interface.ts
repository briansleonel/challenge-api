import { Role } from 'src/common/enums/role.enum';

export interface IPayloadToken {
  sub: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface IAuthBody {
  email: string;
  password: string;
}
