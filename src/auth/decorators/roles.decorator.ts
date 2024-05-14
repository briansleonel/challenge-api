import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/common/constants/keys-decorators.constants';
import { Role } from 'src/common/enums/role.enum';

export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);
