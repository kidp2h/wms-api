import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import Service from '@/common/base.service';
import { UpdateProjectDto, ProjectDto, CreateProjectDto } from '@/.gen/dto';
import { Project } from '@/.gen/prisma-class/project';
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
