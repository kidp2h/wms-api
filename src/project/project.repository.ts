import { Injectable } from '@nestjs/common';

import BaseRepository from '@/common/base.repository';

import { PrismaService } from '@/common/prisma/prisma.service';
import { Project } from '@/.gen/prisma-class/project';
<<<<<<< Updated upstream
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';
=======
import { map } from '@/utils';
import { TimeEntryProject } from '@/.gen/prisma-class/time_entry_project';
>>>>>>> Stashed changes

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
  GetProjectsByEmployeeId(employeeId: string,year :number): Promise<Project[]> {
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
