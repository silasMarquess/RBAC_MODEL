import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/customDecors/role-decorator';
import { Request } from 'express';
import { Role } from 'generated/prisma';
import User from 'src/users/entities/user.entity';

@Injectable()
export default class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndMerge(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request: Request = context.switchToHttp().getRequest();
    return this.CheckRoles(roles, request.user as User);
  }

  private CheckRoles(roles: Role[], user: User) {
    return user.roles.some((role) => roles.includes(role));
  }
}
