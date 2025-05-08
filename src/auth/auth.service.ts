import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDTO from './dto/user-login';
import { UsersService } from 'src/users/users.service';
import IHashPassordGenerator from 'src/shared-module/hashpassword.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject('HASH_SERVICE') private readonly hashService: IHashPassordGenerator,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<string> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('user not found');

    const isValidPassword = await this.hashService.verify(
      password,
      user.passwordHash,
    );

    if (!isValidPassword) throw new UnauthorizedException('Invalid Password');

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }
}
