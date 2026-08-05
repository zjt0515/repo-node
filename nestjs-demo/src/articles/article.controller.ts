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
import { ArticleService } from './article.service.js';
import type { Response } from 'express';
import { CreateArticleDTO } from './dto/create-article.dto.js';
import { UpdateArticleDTO } from './dto/update-article.dto.js';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(
    @Body()createArticleDto: CreateArticleDTO,
  ) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDTO) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response: Response) {
    return this.articleService.remove(id);
  }
}
