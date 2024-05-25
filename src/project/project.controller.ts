import { BaseController } from '@/common/base.controller';
import { Controller } from '@nestjs/common';
import { CreateProjectDto } from '@/.gen/dto/create-project.dto';
import { ProjectDto } from '@/.gen/dto/project.dto';
import { Project } from '@/.gen/dto/project.entity';
import { UpdateProjectDto } from '@/.gen/dto/update-project.dto';
import Service from '@/common/base.service';

@Controller()
export class ProjectController extends BaseController<Project>(
  Project,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
) {
  constructor(private readonly projectService: Service<Project>) {
    super(projectService);
  }
}
