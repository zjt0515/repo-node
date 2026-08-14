import { defineEntity, p } from '@mikro-orm/postgresql';
import { User } from '../../users/entities/user.entity';

export const ArticleSchema = defineEntity({
  name: 'Article',
  properties: {
    id: p.integer().primary(),
    title: p.string().unique(),
    content: p.text(),
    status: p.enum(() => ArticleStatus),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onCreate(() => new Date()).onUpdate(() => new Date()),
    author: () => p.manyToOne(User)
  },
});

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published'
} 

export class Article extends ArticleSchema.class { }
ArticleSchema.setClass(Article);
