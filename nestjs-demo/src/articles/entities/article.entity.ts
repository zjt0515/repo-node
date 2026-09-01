import { defineEntity, p } from '@mikro-orm/postgresql';

import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

export const ArticleSchema = defineEntity({
  name: 'Article',
  properties: {
    id: p.integer().primary(),
    title: p.string().unique(),
    content: p.text(),
    status: p.enum(() => ArticleStatus),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    author: () => p.manyToOne(User),
    comments: () => p.oneToMany(Comment).mappedBy('article')
  },
});

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export class Article extends ArticleSchema.class {}
ArticleSchema.setClass(Article);
