import { Inject, Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Leave } from '@/.gen/prisma-class/leave';
import { CreateLeaveDto } from '@/.gen/dto/create-leave.dto';
import { LeaveDto } from '@/.gen/dto/leave.dto';
import { UpdateLeaveDto } from '@/.gen/dto/update-leave.dto';
import { PrismaClient } from '@prisma/client';
import { Action } from '@/common/types';

@Injectable()
export class LeaveRepository extends BaseRepository<
  Leave,
  LeaveDto,
  CreateLeaveDto,
  UpdateLeaveDto
> {
  constructor(@Inject(PrismaService) private prisma: PrismaClient) {
    super(prisma.leave as unknown as Action, {
      include: {
        employees: true,
        employeeLeave: true,
        leaves: true,
      },
    });
  }
}
