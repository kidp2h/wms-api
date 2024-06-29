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
  async  getProjectsByEmployeeId(
    employeeId: string,
    year: number,type:string
  ): Promise<Project[]> {
    const map = new Map();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
    let a = await this.prisma.project.findMany({
      
      where: {
        type : type,
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
    return  this.filterUniqueNames(a)
  }
  private filterUniqueNames(projects: Project[]): Project[] {
    const map = new Map();
    return projects.filter((project) => {
      if (!map.has(project.id)) {
        map.set(project.id, true);
        return true;
      }
      return false;
    });
  }


}
