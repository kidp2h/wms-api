import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      // console.log(params);

      if (params.action == 'create' && params.model == 'Employee') {
        const employee = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(employee.password, salt);
        employee.password = hash;
        params.args.data = employee;
      }
      return next(params);
    });
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
