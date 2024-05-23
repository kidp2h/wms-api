import { BaseController } from '@/common/base.controller';
import { LeaveService } from './leave.service';
import { Controller } from '@nestjs/common';
import { CreateLeaveDto } from '@/.gen/dto/create-leave.dto';
import { LeaveDto } from '@/.gen/dto/leave.dto';
import { Leave } from '@/.gen/dto/leave.entity';
import { UpdateLeaveDto } from '@/.gen/dto/update-leave.dto';

@Controller()
export class LeaveController extends BaseController<
  Leave,
  LeaveDto,
  CreateLeaveDto,
  UpdateLeaveDto
>('leave', Leave, LeaveDto, CreateLeaveDto, UpdateLeaveDto) {
  constructor(private readonly leaveService: LeaveService) {
    super();
    this._service = leaveService;
  }
}
