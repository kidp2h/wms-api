import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import Service from '@/common/base.service';
import { Project } from '@/.gen/prisma-class/project';
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';
@Injectable()
export class ProjectService extends Service<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(private readonly projectRepository: ProjectRepository) {
    super();
    this._repository = projectRepository;
  }
}
