import { PickType } from '@nestjs/mapped-types';
import { Employee } from '@/.gen/prisma-class/employee';

export class AuthDto extends PickType(Employee, [
  'code',
  'password',
] as const) {}
