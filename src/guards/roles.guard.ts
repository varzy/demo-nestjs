import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_METADATA_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const availableRoles = this.reflector.get<string[]>(ROLES_METADATA_KEY, context.getHandler());
    if (!availableRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const userRoleNames = user.roles.map((role) => role.name);
    // 如果用户有超级管理员角色，直接放行
    if (userRoleNames.includes('Super')) return true;
    // 反之有任何一个可用角色，则放行
    return availableRoles.some((role) => user.roles?.map((role) => role.name).includes(role));
  }
}
