import { Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Leave } from '@/.gen/prisma-class/leave';
import { CreateLeaveDto } from '@/.gen/dto/create-leave.dto';
import { LeaveDto } from '@/.gen/dto/leave.dto';
import { UpdateLeaveDto } from '@/.gen/dto/update-leave.dto';

@Injectable()
export class LeaveRepository extends BaseRepository<
  Leave,
  LeaveDto,
  CreateLeaveDto,
  UpdateLeaveDto
> {
  constructor(private prisma: PrismaService) {
    super({
      include: {
        employees: true,
        employeeLeave: true,
        leaves: true,
      },
    });
    this._model = this.prisma.leave as any;
  }
}
