import { Role } from 'generated/prisma';

export default interface UserPayLoad {
  id: string;
  email: string;
  roles: Role[];
}
