import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from './mikro-orm.config';
import { DbExceptionFilter } from './common/filters/db-exception/db-exception.filter';
import { Logger } from 'nestjs-pino';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import helmet from '@fastify/helmet';

async function bootstrap() {
  // Express Version
  // const app = await NestFactory.create(AppModule);

  // Fastify Version
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  // express-helmet
  // app.use(helmet());
  // fastify-helmet
  await app.register(helmet);

  // cors
  app.enableCors();

  // Logger
  app.useLogger(app.get(Logger));
  // orm
  await MikroORM.init(mikroOrmConfig);

  // class-vaalildation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // globalFilters
  app.useGlobalFilters(new DbExceptionFilter());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Todos')
    .setDescription('todo api')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // listen
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
