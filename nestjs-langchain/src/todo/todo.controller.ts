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
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { response, type Response } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { llm } from 'src/agent/deepseek';
import { PromptDto } from './dto/prompt.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAllTodos();
  }

  @Get('translate')
  async getAI(@Body() body: PromptDto) {
    const aiMsg = await llm.invoke([
      [
        'system',
        'You are a helpful assistant that translates English to Chinese. Translate the user sentence.',
      ],
      ['human', body.content],
    ]);
    return aiMsg.content;
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
