import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Authorizer = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {},
);