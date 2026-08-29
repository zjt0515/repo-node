import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ArticleModule } from './articles/article.module.js';
import { AuthModule } from './auth/auth.module.js';
import { pinoHttpConfig } from './common/configs/pino.js';
import { throttlerConfig } from './common/configs/throttler.js';
import { DfModule } from './df/df.module.js';
import { HeroesModule } from './heroes/heroes.module.js';
import ormConfig from './mikro-orm.config.js';
import { TodoModule } from './todo/todo.module.js';
import { UsersModule } from './users/users.module.js';
import { CommentsModule } from './comments/comments.module';

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
    ArticleModule,
    CommentsModule,
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
