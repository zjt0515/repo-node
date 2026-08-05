import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodoController } from './todo.controller.js';
import { TodoService } from './todo.service.js';
import { TodoEntity } from './entities/todo.entity.js';

@Module({
  imports: [MikroOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
