import { Module } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
