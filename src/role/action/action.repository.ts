import { Inject, Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { CreateActionDto } from '@/.gen/dto/create-action.dto';
import { ActionDto } from '@/.gen/dto/action.dto';
import { UpdateActionDto } from '@/.gen/dto/update-action.dto';
import { PrismaClient } from '@prisma/client';
import { Action as _ } from '@/common/types';
import { Action } from '@/.gen/prisma-class/action';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class ActionRepository extends BaseRepository<
  Action,
  ActionDto,
  CreateActionDto,
  UpdateActionDto
> {
  constructor(@Inject(PrismaService) private prisma: PrismaClient) {
    super(prisma.action as unknown as _, {});
  }
}
