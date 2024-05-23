import { BaseController } from '@/common/base.controller';
import { Role } from '@/.gen/prisma-class/role';
import { RoleService } from './role.service';
import { Controller } from '@nestjs/common';
import { CreateRoleDto } from '@/.gen/dto/create-role.dto';
import { RoleDto } from '@/.gen/dto/role.dto';
import { UpdateRoleDto } from '@/.gen/dto/update-role.dto';
@Controller()
export class RoleController extends BaseController<
  Role,
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto
>('Role', Role, RoleDto, CreateRoleDto, UpdateRoleDto) {
  constructor(private readonly RoleService: RoleService) {
    super();
    this._service = RoleService;
  }
}
