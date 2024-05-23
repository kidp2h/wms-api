import { Injectable } from '@nestjs/common';
import { ActionRepository } from './action.repository';
import BaseService from '@/common/base.service';
import { Action } from '@/.gen/prisma-class/action';
import { CreateActionDto } from '@/.gen/dto/create-action.dto';
import { ActionDto } from '@/.gen/dto/action.dto';
import { UpdateActionDto } from '@/.gen/dto/update-action.dto';
@Injectable()
export class ActionService extends BaseService<
  Action,
  ActionDto,
  CreateActionDto,
  UpdateActionDto
> {
  constructor(private readonly actionRepository: ActionRepository) {
    super();
    this._repository = actionRepository;
  }
}
