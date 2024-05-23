import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import os from 'os';

import { PrismaExceptionFilter } from '@/common/exceptions/PrismaExceptionFilter';

import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swagger = (app: NestExpressApplication) => {
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('API Documentation WMS')
      .setDescription('Version API')
      .setVersion('1.0')
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('/api/:version?/docs', app, document, {
      patchDocumentOnRequest: (req, _res, document) => {
        const copyDocument = JSON.parse(JSON.stringify(document));
        const version = (req as any).params.version;
        if (version === undefined) {
          return copyDocument;
        }

        const isValidVersion = /^v(\d+\.)?(\d+\.)?(\*|\d+)$/;

        if (!version || !isValidVersion.test(version)) {
          return;
        }
        document.info.version = version.replace('v', '');
        for (const route in document.paths) {
          if (route.startsWith(`/api/${version}`)) {
            continue;
          }
          delete copyDocument.paths[route];
        }

        return copyDocument;
      },
    });
  }
};

const actionGlobal = (app: NestExpressApplication) => {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PrismaExceptionFilter());
};

const security = (app: NestExpressApplication) => {
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: '*',
      credentials: true,
    });
  }
};

const configApi = (app: NestExpressApplication) => {
  app.use(compression());

  bodyParser.urlencoded({ extended: false });

  app.use(bodyParser.json({ limit: '200mb' }));

  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
  app.use(bodyParser.text({ limit: '200mb' }));
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });
};
async function bootstrap() {
  if (process.env.PORT) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const cpus = os.cpus().length;
    process.env.UV_THREADPOOL_SIZE = cpus.toString();
    swagger(app);
    actionGlobal(app);
    security(app);
    configApi(app);

    await app.listen(process.env.PORT || 8334);
  } else {
    throw Error('Environment variables not found.');
  }
}
bootstrap();
