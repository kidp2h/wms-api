import { Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Project } from '@/.gen/prisma-class/project';
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';

@Injectable()
export class ProjectRepository extends BaseRepository<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(private prisma: PrismaService) {
    super({
      include: {
        employees: true,
        employeeLeave: true,
        leaves: true,
      },
    });
    this._model = this.prisma.project as any;
  }
}
