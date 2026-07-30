import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from './entities/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature(ArticleEntity)],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
