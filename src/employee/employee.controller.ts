import { BaseController } from '@/common/base.controller';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Put,
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
  }
}
