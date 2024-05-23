import { BaseController } from '@/common/base.controller';
// import { UpdateEmployeeDto } from './employee.dto';
import { EmployeeService } from './employee.service';
import { Controller } from '@nestjs/common';
import { CreateEmployeeDto } from '@/.gen/dto/create-employee.dto';
import { EmployeeDto } from '@/.gen/dto/employee.dto';
import { Employee } from '@/.gen/dto/employee.entity';
import { UpdateEmployeeDto } from '@/.gen/dto/update-employee.dto';

@Controller()
export class EmployeeController extends BaseController<
  Employee,
  EmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto
>('employee', Employee, EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto) {
  constructor(private readonly employeeService: EmployeeService) {
    super();
    this._service = employeeService;
  }
}
