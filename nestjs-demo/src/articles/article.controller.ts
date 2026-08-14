import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service.js';
import type { Response } from 'express';
import { CreateArticleDTO } from './dto/create-article.dto.js';
import { UpdateArticleDTO } from './dto/update-article.dto.js';
import { PaginationArticleDto } from './dto/pagination-article.dto.js';
import { FilterArticleDto } from './dto/filter-article.dto.js';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('public')
  findAllPublic(@Query() paginationArticleDto: PaginationArticleDto) {
    return this.articleService.findAll(paginationArticleDto);
  }

  @Get()
  findAll(@Query() filterArticleDto: FilterArticleDto) {
    return this.articleService.findAll(filterArticleDto);
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
