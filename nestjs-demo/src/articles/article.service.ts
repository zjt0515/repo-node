import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ArticleEntity } from './entities/article.entity.js';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateArticleDTO } from './dto/create-article.dto.js';
import { User } from 'src/users/entities/user.entity.js';
import { UpdateArticleDTO } from './dto/update-article.dto.js';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: EntityRepository<ArticleEntity>,
    private readonly em: EntityManager
  ) {
  }
  async create(createArticleDto: CreateArticleDTO) {
    const { authorId, ...createArticleData } = createArticleDto
    const author = await this.em.findOne(User, {id: authorId})

    if (!author) {
      throw new NotFoundException('Author not found')
    }

    // TODO delete updatedAt..
    const article = this.articleRepo.create({
      ...createArticleData,
      updatedAt: new Date(),
      createdAt: new Date(),
      author
    })

    await this.em.flush()
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Article created successfully'
    }
  }

  async findOne(id: number) {
    const article = await this.articleRepo.findOne(id, 
      {populate: ['author'], exclude: ['author.password']}
    )

    if (!article) {
      throw new NotFoundException('Article is not found')
    }

    return article
  }

  async findAll() {
    // TODO: add pagination, exclude content
    const articles = await this.articleRepo.findAll()
    return articles
  }

  async update(id: number, updateArticleDto: UpdateArticleDTO) {
    const article = await this.findOne(id)

    // not update authorId
    const { authorId, ...updateArticleData } = updateArticleDto;

    this.em.assign(article, updateArticleData)
  
    await this.em.flush()
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    await this.em.remove(article).flush()

    return {
      statusCode: HttpStatus.OK,
      message: 'Article deleted successfully'
    }
  }
}
