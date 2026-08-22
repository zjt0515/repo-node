import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

import { CreateTodoDTO } from './dto/create-todo.dto.js';
import { FilterTodoDTO } from './dto/filter-todo.dto.js';
import { UpdateTodoDTO } from './dto/update-todo.dto.js';
import { TodoService } from './todo.service.js';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Throttle({ default: { ttl: 1000, limit: 2 } })
  findAll(@Query() filterTodoDto: FilterTodoDTO) {
    return this.todoService.findAll(filterTodoDto);
  }

  @SkipThrottle()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDTO) {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateTodoDTO) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.todoService.remove(id);

    // if (res) {
    //   return response.json({
    //     message: 'todo deleted',
    //   });
    // }

    // return response.status(HttpStatus.BAD_REQUEST).json({
    //   message: 'bad request',
    // });
  }
}
