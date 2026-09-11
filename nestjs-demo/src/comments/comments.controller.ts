import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { FilterCommentsDto } from './dto/filter-comments.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  
  @Public()
  @Get('public')
  findAllByArticlePublic(@Query() articleId: number,@Body() paginationDto: PaginationDto) {
    return this.commentsService.findAllByArticlePublic(articleId, paginationDto);
  }

  @Post(":id")
  @ApiBearerAuth()
  createByUser(@Req() request: any, @Param() articleId: number,@Body() createCommentDto: CreateCommentDto) {
    const userId = Number(request.user.sub)
    return this.commentsService.create(userId, articleId, createCommentDto);
  }

  @Post("me/:id")
  @ApiBearerAuth()
  removeByUser(@Req() request: any,@Param() commentId: number){
    const userId = Number(request.user.sub)
    return this.commentsService.removeByUser(userId, commentId)
  }
  
  @Get('admin')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  findAll(@Body() filterCommentsDto: FilterCommentsDto){
    return this.commentsService.findAll(filterCommentsDto)
  }
  
  @Post("admin/:id")
  @ApiBearerAuth()
  @Roles(Role.Admin)
  remove(@Param('id') commentId: number){
    return this.commentsService.remove(commentId)
  }
}
