import { BaseController } from '@/common/base.controller';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
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
import { getWeekNumber } from '@/utils/Date';
import { Role } from '@prisma/client';
import { IProjectService, ProjectService } from '@/project';

@Controller()
@UseGuards(AuthGuard)
export class EmployeeController extends BaseController<
  Employee,
  unknown,
  unknown,
  unknown
>(
  Employee,
  EmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  'employee',
  true,
) {
  constructor(
    private readonly employeeService: Service<Employee>,
    @Inject(ProjectService)
    private readonly projectService: IProjectService,
    @Inject(TimeEntryService)
    private readonly timeEntryService: ITimeEntryService,
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
    const timeEntriesUpdate: Partial<TimeEntryProject>[] = [],
      timeEntriesCreate: Partial<TimeEntryProject>[] = [];
    timeEntries.forEach((timeEntry) => {
      console.log(timeEntry.date);

      if (timeEntry?.id) {
        const { date, ...rest } = timeEntry;
        timeEntriesUpdate.push({
          ...rest,
        });
      } else {
        const current = getWeekNumber(new Date())[1];
        const _ = getWeekNumber(new Date(timeEntry.date!))[1];
        if (current !== _ && payload.employee.role !== Role.MANAGER) {
          return null;
        }

        if (timeEntry.employeeId) {
          timeEntriesCreate.push({
            ...timeEntry,
            employeeId: timeEntry.employeeId,
            hours: timeEntry.hours ? timeEntry.hours : 0,
          });
        } else
          timeEntriesCreate.push({
            ...timeEntry,
            employeeId: payload.sub,
            hours: timeEntry.hours ? timeEntry.hours : 0,
          });
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
  }
  @Get('/employee/project/:id?')
  @Message.Success({
    message: `${capitalize('project')} found`,
    status: 201,
  })
  @ApiBearerAuth('JWT-auth')
  getProjectsEmployee(
    @Authorizer() payload: { sub: string; employee: Employee },
    @Query('year') year?: number,
  ) {
    const dnow = new Date();
    return this.projectService.getProjectsByEmployeeId(
      payload.sub,
      year || dnow.getFullYear(),
    );
  }
}
