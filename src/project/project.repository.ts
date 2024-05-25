import { Inject, Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Project } from '@/.gen/prisma-class/project';
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';
import { Action } from '@/common/types';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class ProjectRepository extends BaseRepository<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(@Inject(PrismaService) private prisma: PrismaClient) {
    super(prisma.project as unknown as Action, {
      include: {
        employees: true,
        employeeLeave: true,
        leaves: true,
      },
    });
  }
}
