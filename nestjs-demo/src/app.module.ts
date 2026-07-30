import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import ormConfig from './mikro-orm.config';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpConfig } from './common/configs/pino';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './common/configs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DfModule } from './df/df.module';
import { HttpModule } from '@nestjs/axios';
import { HeroesModule } from './heroes/heroes.module';

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
