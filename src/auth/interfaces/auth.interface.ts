import { Role } from 'src/common/enums/role.enum';

export interface IBasePayloadToken {
  sub: string;
  email: string;
  role: Role;
}

export interface IPayloadToken extends IBasePayloadToken {
  iat: number;
  exp: number;
}

export interface IAuthBody {
  email: string;
  password: string;
}
