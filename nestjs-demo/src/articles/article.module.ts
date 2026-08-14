import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller.js';
import { ArticleService } from './article.service.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Article } from './entities/article.entity.js';
import { User } from '../users/entities/user.entity.js';

@Module({
  imports: [MikroOrmModule.forFeature([Article,User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
