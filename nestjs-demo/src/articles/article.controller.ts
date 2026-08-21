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
  Req,
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
import { Public } from '../auth/decorator/public.decorator.js';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  // Todo: only available for admin
  findAll(@Query() filterArticleDto: FilterArticleDto) {
    return this.articleService.findAll(filterArticleDto);
  }

  @Get('public')
  @Public()
  findAllPublic(@Query() paginationArticleDto: PaginationArticleDto) {
    return this.articleService.findAllPublic(paginationArticleDto);
  }

  @Get('me')
  findAllByCurrentUser(@Req() req:any,@Query() filterArticleDto: FilterArticleDto) {
    const userId = Number(req.user.sub)
    return this.articleService.findAllByUser(userId, filterArticleDto);
  }

  @Get(':id')
  // Todo: only available for admin
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Get('me/:id')
  findOneByCurrentUser(@Req() req, @Param('id') id: number) {
    const userId = Number(req.user.sub)
    return this.articleService.findOneByUser(userId, id);
  }

  @Get('public/:id')
  @Public()
  findOnePublic(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  createByCurrentUser(
    @Req() req: any,
    @Body()createArticleDto: CreateArticleDTO,
  ) {
    const authorId = Number(req.user.sub)
    return this.articleService.create(authorId, createArticleDto);
  }

  @Patch(':id')
  updateByCurrentUser(@Req() req: any,@Param('id') articleId: number, @Body() updateArticleDto: UpdateArticleDTO) {
    const authorId = Number(req.user.sub)
    return this.articleService.update(authorId, articleId, updateArticleDto);
  }

  @Delete(':id')
  deleteByCurrentUser(@Res() req: any, @Param('id') id: number) {
    const authorId = Number(req.user.sub)
    return this.articleService.remove(id);
  }
}
