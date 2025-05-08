import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDTO from './dto/user-login';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login({ email, password });
    response.json({
      token: token,
    });
  }
}
