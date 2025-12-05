import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn', 'log', 'fatal'],
  });
  app.setGlobalPrefix('api/v1'); // 设置全局前缀
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
