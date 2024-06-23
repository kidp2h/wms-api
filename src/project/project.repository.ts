import { Inject, Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/.gen/dto';
import { Action } from '@/common/types';
import { PrismaClient } from '@prisma/client/extension';
import { Project } from '@/.gen/prisma-class/project';

@Injectable()
export class ProjectRepository extends BaseRepository<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(@Inject(PrismaService) private prisma: PrismaClient) {
    super(
      prisma.project as unknown as Action,
      {
        include: {},
      },
      (values) => {
        return {
          ...values,
          limit: +values.limit,
        };
      },
    );
  }
  getProjectsByEmployeeId(
    employeeId: string,
    year: number,
  ): Promise<Project[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
    return this.prisma.project.findMany({
      where: {
        startedAt: {
          gte: startDate,
          lt: endDate,
        },
        timeEntries: {
          some: {
            employeeId: employeeId,
          },
        },
      },
    });
  }
}
