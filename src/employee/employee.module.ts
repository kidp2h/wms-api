import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { PrismaModule } from '@/common/prisma/prisma.module';
import Service from '@/common/base.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      provide: Service,
      useClass: EmployeeService,
    },
    EmployeeRepository,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
