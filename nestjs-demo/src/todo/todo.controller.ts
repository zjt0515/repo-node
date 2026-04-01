import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOneTodo(id);
  }

  @Post()
  create(
    @Body()
    body: CreateTodoDto,
  ) {
    return this.todoService.createTodo(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateTodoDto) {
    return this.todoService.updateTodo(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response: Response) {
    const res = this.todoService.deleteTodo(id);

    if (res) {
      return response.json({
        message: 'todo deleted',
      });
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      message: 'bad request',
    });
  }
}
