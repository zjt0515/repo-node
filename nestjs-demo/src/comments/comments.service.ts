import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { UsersService } from '../users/users.service';
import { ArticleService } from '../articles/article.service';
import { ServiceResp } from '../common/types';
import { FilterCommentsDto } from './dto/filter-comments.dto';

@Injectable()
export class CommentsService {
  COMMENT_LIMIT = 10;

  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private readonly usersService: UsersService,
    private readonly articlesService: ArticleService,
  ) {}

  async create(userId:number, articleId: number, createCommentDto: CreateCommentDto):Promise<ServiceResp> {
    this.em.begin()

    await this.articlesService.findOne(articleId)
    await this.usersService.findOne(userId)

    this.commentRepository.create({
      content: createCommentDto.content,
      article: articleId,
      author: userId
    })

    await this.em.flush()
    await this.em.commit()

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Comment created'
    }
  }

  async findAllByArticlePublic(articleId: number, paginationDto: PaginationDto) {
    const { page } = paginationDto;

    const offset = (page - 1) * this.COMMENT_LIMIT;

    const comments = await this.commentRepository.findAll({
      where: {
        article: {
          id: articleId,
        },
      },
      limit: this.COMMENT_LIMIT,
      offset,
    });

    if (!comments) {
      throw new NotFoundException('Comments not found');
    }

    return comments;
  }

  async removeByUser(userId: number, commentId: number): Promise<ServiceResp>{
    const comment = await this.findOne(commentId)
    await this.em.remove(comment).flush()
    await this.em.commit()
    return {
      statusCode: HttpStatus.OK,
      message: 'Comment deleted'
    }
  }

  async findOne(id: number){
    const comment = await this.commentRepository.findOne(id)  
    if(!comment){
      throw new NotFoundException('Comment not found')
    }
    return comment
  }

  async findAll(filterCommentsDto: FilterCommentsDto){
    const {content, page} = filterCommentsDto
    const offset = (page - 1) * this.COMMENT_LIMIT
    const comments = await this.commentRepository.findAll({
      where:{
        content 
      }, 
      limit: this.COMMENT_LIMIT,
      offset
    })
    if(!comments){
      throw new NotFoundException('Comments not found')
    }
    return comments
  }
  async delete(commentId: number):Promise<ServiceResp>{
    await this.em.begin()

    const comment = await this.findOne(commentId)

    this.em.remove(comment).flush()
    this.em.commit()
    return {
      statusCode: HttpStatus.OK,
      message: 'Comment deleted'
    }
  }
}
