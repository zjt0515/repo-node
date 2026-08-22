import { faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';

import { Article, ArticleStatus } from '../articles/entities/article.entity';

export class ArticleFactory extends Factory<Article> {
  model = Article;

  definition(): Partial<Article> {
    return {
      title: faker.book.title(),
      content: faker.lorem.text(),
      status: faker.helpers.enumValue(ArticleStatus),
    };
  }
}
