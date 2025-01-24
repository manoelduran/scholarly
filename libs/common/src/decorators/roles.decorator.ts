import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../dto';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
