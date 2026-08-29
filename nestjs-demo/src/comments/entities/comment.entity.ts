import { defineEntity, p } from '@mikro-orm/postgresql';

import { User } from '../../users/entities/user.entity';
import { Article } from '../../articles/entities/article.entity';

export const CommentSchema = defineEntity({
  name: 'Comment',
  properties: {
    id: p.integer().primary(),
    content: p.text(),
    createdAt: p.datetime().onCreate(() => new Date()),
    author: () => p.manyToOne(User),
    article: () => p.manyToOne(Article)
  },
});

export class Comment extends CommentSchema.class {}
CommentSchema.setClass(Comment);