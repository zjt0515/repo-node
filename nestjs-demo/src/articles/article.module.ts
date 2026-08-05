import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller.js';
import { ArticleService } from './article.service.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from './entities/article.entity.js';
import { User } from 'src/users/entities/user.entity.js';

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity,User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
