import { BaseController } from '@/common/base.controller';
import { Controller } from '@nestjs/common';
import { CreateLeaveDto } from '@/.gen/dto/create-leave.dto';
import { LeaveDto } from '@/.gen/dto/leave.dto';
import { Leave } from '@/.gen/dto/leave.entity';
import { UpdateLeaveDto } from '@/.gen/dto/update-leave.dto';
import Service from '@/common/base.service';

@Controller()
export class LeaveController extends BaseController<Leave>(
  Leave,
  LeaveDto,
  CreateLeaveDto,
  UpdateLeaveDto,
) {
  constructor(private readonly leaveService: Service<Leave>) {
    super(leaveService);
  }
}
