import { Module } from '@nestjs/common';

import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { ActionRepository } from './action.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActionController],
  providers: [ActionService, ActionRepository],
  exports: [ActionService],
})
export class ActionModule {}
