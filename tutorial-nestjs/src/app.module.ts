import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import * as dotenv from 'dotenv';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import { User } from './user/entities/user.entity';
import { Profile } from './user/entities/profile.entity';
import { Roles } from './roles/entities/roles.entity';
import { Logs } from './logs/entities/logs.entity';
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: '.env' })],
      load: [configuration],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get(ConfigEnum.DB_HOST),
    //     port: configService.get(ConfigEnum.DB_PORT),
    //     username: configService.get(ConfigEnum.DB_USERNAME),
    //     password: configService.get(ConfigEnum.DB_PASSWORD),
    //     database: configService.get(ConfigEnum.DB_DATABASE),
    //     entities: [],
    //     // 同步本地schema/数据库，初始化时使用
    //     synchronize: configService.get(ConfigEnum.DB_SYNC),
    //     logging: ['error'],
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test_db',
      entities: [User, Profile, Roles, Logs],
      // 同步本地schema/数据库，初始化时使用
      synchronize: true,
      logging: ['error'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
