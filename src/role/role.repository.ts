import { Inject, Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Role } from '@/.gen/prisma-class/role';
import { CreateRoleDto } from '@/.gen/dto/create-role.dto';
import { RoleDto } from '@/.gen/dto/role.dto';
import { UpdateRoleDto } from '@/.gen/dto/update-role.dto';
import { PrismaClient } from '@prisma/client';
import { Action } from '@/common/types';

@Injectable()
export class RoleRepository extends BaseRepository<
  Role,
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaClient) {
    super(prisma.role as unknown as Action, {
      include: {
        employees: true,
        actions: true,
      },
    });
  }
}
