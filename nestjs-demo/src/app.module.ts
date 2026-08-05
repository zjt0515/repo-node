import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TodoModule } from './todo/todo.module.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module.js';
import ormConfig from './mikro-orm.config.js';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpConfig } from './common/configs/pino.js';
import { AuthModule } from './auth/auth.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './common/configs/throttler.js';
import { APP_GUARD } from '@nestjs/core';
import { DfModule } from './df/df.module.js';
import { HttpModule } from '@nestjs/axios';
import { HeroesModule } from './heroes/heroes.module.js';

@Module({
  imports: [
    TodoModule,
    MikroOrmModule.forRoot(ormConfig),
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: pinoHttpConfig,
    }),
    ThrottlerModule.forRoot({
      throttlers: throttlerConfig,
    }),
    AuthModule,
    DfModule,
    HttpModule,
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
