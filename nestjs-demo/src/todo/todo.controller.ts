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
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Throttle({ default: { ttl: 1000, limit: 2 } })
  findAll(@Query() filterTodoDto: FilterTodoDto) {
    return this.todoService.findAll(filterTodoDto);
  }

  @SkipThrottle()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateTodoDto) {
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
