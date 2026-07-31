import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  articles = [
    {
      id: 0,
      title: 'reading',
      content: '1',
      isCompleted: false,
    },
    {
      id: 1,
      title: 'drinking',
      content: '2',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'coding',
      content: '3',
      isCompleted: false,
    },
  ];

  createArticle(newArticle: CreateArticleDto) {
    this.articles.push({ id: Date.now(), ...newArticle });
    return newArticle;
  }

  findOneArticle(id: number) {
    return this.articles.find((article) => Number(id) === Number(article.id));
  }

  findAllArticles() {
    return this.articles;
  }

  updateArticle(id: number, updateArticle: UpdateArticleDto) {
    this.articles = this.articles.map((article) => {
      if (Number(article.id) === Number(id)) {
        return {
          ...article,
          ...updateArticle,
        };
      }
      return article;
    });
    return updateArticle;
  }

  deleteArticle(id: number) {
    this.articles = this.articles.filter((article) => Number(article.id) !== Number(id));
    return true;
  }
}
