import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@nestjs-modules/ioredis';

import { PrismaService } from '@/common/prisma/prisma.service';
import { RoleModule } from '@/role';
import { ActionModule } from '@/role/action';
import { EmployeeModule } from './employee';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',

      url: process.env.REDIS_URL,
      options: {
        connectTimeout: 10000,
        commandTimeout: 2000,
      },
    }),
    BullModule.forRoot({
      redis: process.env.REDIS_URL,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '36000s' },
    }),
    ActionModule,
    RoleModule,
    EmployeeModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
