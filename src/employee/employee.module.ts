import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
import Service from '@/common/base.service';
import { TimeEntryProject, Employee } from '@/.gen/dto';
import {
  TimeEntryModule,
  TimeEntryService,
  ITimeEntryService,
} from '@/time-entry';

@Module({
  imports: [PrismaModule, TimeEntryModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      provide: Service<Employee>,
      useClass: EmployeeService,
    },
    EmployeeRepository,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
