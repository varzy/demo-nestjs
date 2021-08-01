import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    // 此处的 user 和 login 方法的 login 参数应当保持同一个数据格式
    const user = await this.prismaService.user.findUnique({
      where: { username },
      include: { roles: true },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  /**
   * 签发 access_token
   * @param user 用户信息。由于 access_token 可被解密，因此用户信息应当进行适当裁剪
   */
  async login(user: any) {
    const payload = { sub: user.id, ...user };
    return { access_token: this.jwtService.sign(payload) };
  }
}
