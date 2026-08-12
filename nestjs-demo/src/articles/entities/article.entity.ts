import { defineEntity, p } from '@mikro-orm/postgresql';
import { User } from '../../users/entities/user.entity';

export const ArticleSchema = defineEntity({
  name: 'Article',
  tableName: 'article',
  properties: {
    id: p.integer().primary(),
    title: p.string().unique(),
    content: p.string(),
    status: p.enum(() => ArticleStatus),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onUpdate(() => new Date()),
    author: () => p.manyToOne(User)
  },
});

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published'
} 

export class ArticleEntity extends ArticleSchema.class { }
ArticleSchema.setClass(ArticleEntity);
