import { Injectable, Logger } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { EmployeeRepository, EmployeeService } from '@/employee';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async authorize(credentials: AuthDto) {
    this.logger.log(`Authorizing employee ${JSON.stringify(credentials)}`);
    const employee = await this.employeeService.findOne({
      code: credentials.code,
    });

    if (employee) {
      try {
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          employee.password,
        );

        if (isPasswordValid) {
          const accessToken = this.jwtService.sign(employee);
          return {
            accessToken,
          };
        }
      } catch (error) {
        this.logger.log(`Error authorizing employee: ${error.message}`);
      }
    }
    this.logger.log(`Employee: ${JSON.stringify(employee)}`);
  }
}
