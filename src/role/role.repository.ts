import { Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Role } from '@/.gen/prisma-class/role';
import { CreateRoleDto } from '@/.gen/dto/create-role.dto';
import { RoleDto } from '@/.gen/dto/role.dto';
import { UpdateRoleDto } from '@/.gen/dto/update-role.dto';

@Injectable()
export class RoleRepository extends BaseRepository<
  Role,
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(private prisma: PrismaService) {
    super({
      include: {
        employees: true,
        actions: true,
      },
    });
    this._model = this.prisma.role as any;
  }
}
