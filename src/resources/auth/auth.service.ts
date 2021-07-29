import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { username } });

    if (user && user.password === (await this.generatePassword(password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async generatePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
