import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
import Service from '@/common/base.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    {
      provide: Service,
      useClass: RoleService,
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}
