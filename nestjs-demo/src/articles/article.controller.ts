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
import { ArticleService } from './article.service';
import type { Response } from 'express';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly todoService: ArticleService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: CreateArticleDTO,
  ) {
    return this.todoService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateArticleDTO) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response: Response) {
    const res = this.todoService.remove(id);

    if (res) {
      return response.json({
        message: 'article deleted',
      });
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      message: 'bad request',
    });
  }
}
