import { BaseController } from '@/common/base.controller';
<<<<<<< Updated upstream
// import { UpdateEmployeeDto } from './employee.dto';
import { EmployeeService } from './employee.service';
import { Controller } from '@nestjs/common';
import { CreateEmployeeDto } from '@/.gen/dto/create-employee.dto';
import { EmployeeDto } from '@/.gen/dto/employee.dto';
import { Employee } from '@/.gen/dto/employee.entity';
import { UpdateEmployeeDto } from '@/.gen/dto/update-employee.dto';
=======
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  TimeEntryProject,
  Employee,
  EmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '@/.gen/dto/';
import Service from '@/common/base.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { capitalize } from 'lodash';
import { Message } from '@/common/decorators/message.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Authorizer } from '@/auth/decorators/authenticator.decorator';
import { ITimeEntryService, TimeEntryService } from '@/time-entry';
import { IProjectService, ProjectService } from '@/project';
>>>>>>> Stashed changes

@Controller()
export class EmployeeController extends BaseController<
  Employee,
  EmployeeDto,
  CreateEmployeeDto,
<<<<<<< Updated upstream
  UpdateEmployeeDto
>('employee', Employee, EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto) {
  constructor(private readonly employeeService: EmployeeService) {
    super();
    this._service = employeeService;
=======
  UpdateEmployeeDto,
  'employee',
  true,
) {
  constructor(
    private readonly employeeService: Service<Employee>,
    @Inject(TimeEntryService)
    private readonly timeEntryService: ITimeEntryService,
    @Inject(ProjectService)
    private readonly projectService: IProjectService,
  ) {
    super(employeeService);
  }

  @Put('/employee/time-entries')
  @Message.Success({
    message: `${capitalize('time-entry')} found`,
    status: 201,
  })
  @Message.Error({
    message: `${capitalize('time-entry')} not found`,
    status: 201,
  })
  @ApiBearerAuth('JWT-auth')
  async updateOrCreateTimeEntriesEmployee(
    @Authorizer() payload: { sub: string; employee: Employee },
    @Body() timeEntries: Partial<TimeEntryProject>[],
  ) {
    console.log(timeEntries);
    // return null;
    const timeEntriesUpdate: Partial<TimeEntryProject>[] = [],
      timeEntriesCreate: Partial<TimeEntryProject>[] = [];
    timeEntries.forEach((timeEntry) => {
      if (timeEntry?.id) {
        timeEntriesUpdate.push(timeEntry);
      } else {
        if (timeEntry.employeeId) {
          timeEntriesCreate.push({
            ...timeEntry,
            employeeId: timeEntry.employeeId,
          });
        } else
          timeEntriesCreate.push({ ...timeEntry, employeeId: payload.sub });
      }
    });

    const [resultUpdate, resultCreate] = await Promise.all([
      this.timeEntryService.updateMany(timeEntriesUpdate),
      this.timeEntryService.createMany(timeEntriesCreate),
    ]);

    return [...resultUpdate, ...resultCreate];
  }

  @Get('/employee/time-entries/:id?')
  @Message.Success({
    message: `${capitalize('time-entry')} found`,
    status: 201,
  })
  @Message.Error({
    message: `${capitalize('time-entry')} not found`,
    status: 201,
  })
  @ApiBearerAuth('JWT-auth')
  getTimeEntriesEmployee(
    @Authorizer() payload: { sub: string; employee: Employee },
    @Param('id') id?: string,
  ) {
    if (id) {
      return this.timeEntryService.findMany({
        employeeId: id,
      });
    } else
      return this.timeEntryService.findMany({
        employeeId: payload.sub,
      });
>>>>>>> Stashed changes
  }

  @Get('/employee/project/:id?')
  @Message.Success({
    message: `${capitalize('project')} found`,
    status: 201,
  })
  @ApiBearerAuth('JWT-auth')
  getProjectsEmployee(
    @Authorizer() payload: { sub: string; employee: Employee },
    @Param('id') id?: string,
    @Query('year') year?: number
  ){
    const dnow = new Date();
    if (id ) {
      return  this.projectService.getprojectsByEmployeeId(id,year || dnow.getFullYear());
    } else
      return this.projectService.getprojectsByEmployeeId(payload.sub,year || dnow.getFullYear());
  }
 

}
