import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ArticleModule } from '../articles/article.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ArticleModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
