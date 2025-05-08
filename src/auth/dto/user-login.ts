import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginDTO {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  password: string;
}
