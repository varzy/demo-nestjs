import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Post } from "../../entities/post.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userDto } = createUserDto;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.usersRepository.save({ ...userDto, password: hash });
  }

  async findAll(relations = []) {
    return await this.usersRepository.find({ relations });
  }

  async findOne(id: number, relations = []) {
    const user = await this.usersRepository.findOne(id, { relations });
    if (!user) throw new NotFoundException('用户不存在');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}