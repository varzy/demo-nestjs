import { SetMetadata } from '@nestjs/common';

export const ROLES_METADATA_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_METADATA_KEY, roles);
