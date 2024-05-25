import { Injectable } from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import Service from '@/common/base.service';
import { Leave } from '@/.gen/prisma-class/leave';
import { CreateLeaveDto } from '@/.gen/dto/create-leave.dto';
import { LeaveDto } from '@/.gen/dto/leave.dto';
import { UpdateLeaveDto } from '@/.gen/dto/update-leave.dto';
@Injectable()
export class LeaveService extends Service<
  Leave,
  LeaveDto,
  CreateLeaveDto,
  UpdateLeaveDto
> {
  constructor(private readonly leaveRepository: LeaveRepository) {
    super();
    this._repository = leaveRepository;
  }
}
