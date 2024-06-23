import { BaseController } from '@/common/base.controller';
import { Controller, ValidationPipe } from '@nestjs/common';
import { UpdateProjectDto, ProjectDto, CreateProjectDto } from '@/.gen/dto';
import { Project } from '@/.gen/prisma-class/project';
import Service from '@/common/base.service';

@Controller()
export class ProjectController extends BaseController<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
>(Project, ProjectDto, CreateProjectDto, UpdateProjectDto) {
  constructor(private readonly projectService: Service<Project>) {
    super(projectService);
  }
}
