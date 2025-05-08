import { Request } from 'express';
import UserPayLoad from 'src/auth/dto/user-payload';

declare module 'express' {
  interface Request {
    user?: UserPayLoad;
  }
}
