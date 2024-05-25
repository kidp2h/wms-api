import { Module } from '@nestjs/common';

import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { LeaveRepository } from './leave.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
import Service from '@/common/base.service';

@Module({
  imports: [PrismaModule],
  controllers: [LeaveController],
  providers: [
    LeaveService,
    LeaveRepository,
    {
      provide: Service,
      useClass: LeaveService,
    },
  ],
  exports: [LeaveService],
})
export class LeaveModule {}
