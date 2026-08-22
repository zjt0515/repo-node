import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Todo } from './entities/todo.entity.js';
import { TodoController } from './todo.controller.js';
import { TodoService } from './todo.service.js';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
