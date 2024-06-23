import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
<<<<<<< Updated upstream

@Module({
  imports: [PrismaModule],
=======
import Service from '@/common/base.service';
import { TimeEntryProject, Employee } from '@/.gen/dto';
import {
  TimeEntryModule,
  TimeEntryService,
  ITimeEntryService,
} from '@/time-entry';
import { ProjectModule } from '@/project';

@Module({
  imports: [PrismaModule, TimeEntryModule, ProjectModule],
>>>>>>> Stashed changes
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  exports: [EmployeeService],
})
export class EmployeeModule {}
