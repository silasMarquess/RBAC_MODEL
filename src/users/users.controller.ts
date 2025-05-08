import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserCreatedDTO } from './dto/user-create.dto';
import { Roles } from 'src/customDecors/role-decorator';
import AuthGuard from 'src/guard/auth-guard';
import RoleGuard from 'src/guard/role-guard';

@Controller('users')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard)
@Roles(['ADMIN'])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post()
  @Roles(['ADMIN'])
  async create(@Body() userCreated: UserCreatedDTO) {
    const user = await this.usersService.creteUser(userCreated);
    return user;
  }

  @Get()
  @Roles(['VIEW', 'EDITOR'])
  async findAll(@Res({ passthrough: true }) response: Response) {
    const users = await this.usersService.findAll();
    return response.json({ users });
  }
}
