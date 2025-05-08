import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import UserPayLoad from 'src/auth/dto/user-payload';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Invalid TOken');

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payLoad = await this.JwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payLoad);
      request.user = payLoad as UserPayLoad;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
