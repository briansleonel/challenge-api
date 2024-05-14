import { Role } from 'src/common/enums/role.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ select: false })
  password: string;
}
