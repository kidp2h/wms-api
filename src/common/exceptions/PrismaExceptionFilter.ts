import { Catch, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    this.logger.error(exception);
  }
}
