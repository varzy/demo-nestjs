import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userDto } = createUserDto;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return await this.prismaService.user.create({ data: { ...userDto, password: hash } });
  }

  async findAll() {
    return await this.prismaService.user.findMany({ include: { posts: true } });
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
