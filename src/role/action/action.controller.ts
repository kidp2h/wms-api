import { BaseController } from '@/common/base.controller';
import { Action } from '@/.gen/prisma-class/action';
import { ActionService } from './action.service';
import { Controller } from '@nestjs/common';
import { CreateActionDto } from '@/.gen/dto/create-action.dto';
import { ActionDto } from '@/.gen/dto/action.dto';
import { UpdateActionDto } from '@/.gen/dto/update-action.dto';
@Controller()
export class ActionController extends BaseController<
  Action,
  ActionDto,
  CreateActionDto,
  UpdateActionDto
>('Action', Action, ActionDto, CreateActionDto, UpdateActionDto) {
  constructor(private readonly ActionService: ActionService) {
    super();
    this._service = ActionService;
  }
}
