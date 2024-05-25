import { Module } from '@nestjs/common';

import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { ActionRepository } from './action.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
import Service from '@/common/base.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ActionController],
  providers: [
    ActionService,
    ActionRepository,
    {
      provide: Service,
      useClass: ActionService,
    },
  ],
  exports: [ActionService],
})
export class ActionModule {}
