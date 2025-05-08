import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import SharedModule from 'src/shared-module/shared..module';
import PrismaService from 'src/prisma.service';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
