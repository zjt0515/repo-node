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
import { Response } from 'express';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly todoService: ArticleService) {}

  @Get()
  findAll() {
    return this.todoService.findAllArticles();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOneArticle(id);
  }

  @Post()
  create(
    @Body()
    body: CreateArticleDto,
  ) {
    return this.todoService.createArticle(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateArticleDto) {
    return this.todoService.updateArticle(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response: Response) {
    const res = this.todoService.deleteArticle(id);

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
