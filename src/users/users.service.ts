import { Inject, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UserCreatedDTO } from './dto/user-create.dto';
import IIdgenerator from 'src/shared-module/id-generator.interface';
import IHashPassordGenerator from 'src/shared-module/hashpassword.interface';
import PrismaService from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('ID_GENERATOR') private readonly idServiceGenerator: IIdgenerator,
    @Inject('HASH_SERVICE') private readonly hashService: IHashPassordGenerator,
  ) {}

  async findAll(): Promise<Partial<User[]>> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findById(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async creteUser(user: UserCreatedDTO): Promise<Partial<User>> {
    const id = this.idServiceGenerator.generate();
    const hash = await this.hashService.hashGenerator(user.password);
    const userCreated = await this.prisma.user.create({
      data: {
        id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        passwordHash: hash,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...rest } = userCreated;
    return rest;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
