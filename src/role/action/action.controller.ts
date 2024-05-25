import { BaseController } from '@/common/base.controller';
import { Action } from '@/.gen/prisma-class/action';
import { ActionService } from './action.service';
import { Controller } from '@nestjs/common';
import { CreateActionDto } from '@/.gen/dto/create-action.dto';
import { ActionDto } from '@/.gen/dto/action.dto';
import { UpdateActionDto } from '@/.gen/dto/update-action.dto';
import Service from '@/common/base.service';
@Controller()
export class ActionController extends BaseController<Action>(
  Action,
  ActionDto,
  CreateActionDto,
  UpdateActionDto,
) {
  constructor(private readonly actionService: Service<Action>) {
    super(actionService);
  }
}
