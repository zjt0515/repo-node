import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Article, ArticleStatus } from './entities/article.entity.js';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { User } from '../users/entities/user.entity';
import { FilterArticleDto } from './dto/filter-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: EntityRepository<Article>,
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

  async findAll(FilterArticleDto: FilterArticleDto) {
    const {page, query} = FilterArticleDto
    const limit = Number(process.env.ARTICLE_LIST_LIMIT) || 10
    const offset = (page - 1) * limit

    const where: any = {
      status: ArticleStatus.PUBLISHED
    }
    if (query && query.trim().length > 0) {
      where.title = {
        $ilike: `%${query}%`
      }
    }
    // TODO: add pagination, exclude content
    const articles = await this.articleRepo.findAll({
      offset,
      limit,
      where,
      exclude: ['content', 'updatedAt']
    })
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
