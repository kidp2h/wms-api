import { BaseController } from '@/common/base.controller';
// import { UpdateEmployeeDto } from './employee.dto';
import { Controller, Get } from '@nestjs/common';
import { CreateEmployeeDto } from '@/.gen/dto/create-employee.dto';
import { EmployeeDto } from '@/.gen/dto/employee.dto';
import { Employee } from '@/.gen/dto/employee.entity';
import { UpdateEmployeeDto } from '@/.gen/dto/update-employee.dto';
import Service from '@/common/base.service';

@Controller()
export class EmployeeController extends BaseController<Employee>(
  Employee,
  EmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
) {
  constructor(private readonly employeeService: Service) {
    super(employeeService);
  }
  @Get('/test1')
  async test() {}
}
