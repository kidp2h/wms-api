import { BaseController } from '@/common/base.controller';
import { Role } from '@/.gen/prisma-class/role';
import { RoleService } from './role.service';
import { Controller } from '@nestjs/common';
import { CreateRoleDto } from '@/.gen/dto/create-role.dto';
import { RoleDto } from '@/.gen/dto/role.dto';
import { UpdateRoleDto } from '@/.gen/dto/update-role.dto';
import Service from '@/common/base.service';
@Controller()
export class RoleController extends BaseController<Role>(
  Role,
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto,
) {
  constructor(private readonly roleService: Service<Role>) {
    super(roleService);
  }
}
