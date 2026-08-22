import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Article } from '../articles/entities/article.entity.js';
import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [MikroOrmModule.forFeature([User, Article])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
