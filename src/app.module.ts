import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@nestjs-modules/ioredis';

import { EmployeeModule } from '@/employee';
import { ProjectModule } from '@/project';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { AuthModule } from '@/auth';

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
    PrismaModule,
    EmployeeModule,
    ProjectModule,
    AuthModule,
  ],
})
export class AppModule {}
