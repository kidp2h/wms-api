import { Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Action } from '@/.gen/prisma-class/action';
import { CreateActionDto } from '@/.gen/dto/create-action.dto';
import { ActionDto } from '@/.gen/dto/action.dto';
import { UpdateActionDto } from '@/.gen/dto/update-action.dto';

@Injectable()
export class ActionRepository extends BaseRepository<
  Action,
  ActionDto,
  CreateActionDto,
  UpdateActionDto
> {
  constructor(private prisma: PrismaService) {
    super({});
    this._model = this.prisma.action as any;
  }
}
