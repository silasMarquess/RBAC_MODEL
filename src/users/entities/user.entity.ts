import { Role } from 'generated/prisma';

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
