import { BaseController } from '@/common/base.controller';
import { ProjectService } from './project.service';
import { Controller } from '@nestjs/common';
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { Project } from '@/.gen/dto/project.entity';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';

@Controller()
export class ProjectController extends BaseController<
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto
>('project', Project, ProjectDto, CreateProjectDto, UpdateProjectDto) {
  constructor(private readonly projectService: ProjectService) {
    super();
    this._service = projectService;
  }
}
