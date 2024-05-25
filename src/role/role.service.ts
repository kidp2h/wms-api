import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import Service from '@/common/base.service';
import { Role } from '@/.gen/prisma-class/role';
import { CreateRoleDto } from '@/.gen/dto/create-role.dto';
import { RoleDto } from '@/.gen/dto/role.dto';
import { UpdateRoleDto } from '@/.gen/dto/update-role.dto';
@Injectable()
export class RoleService extends Service<
  Role,
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(private readonly roleRepository: RoleRepository) {
    super();
    this._repository = roleRepository;
  }
}
