import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [TodoModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
