import { defineEntity, p } from '@mikro-orm/postgresql';
import { Article } from '../../articles/entities/article.entity';

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.integer().primary(),
    email: p.string().unique(),
    password: p.string(),
    articles: () => p.oneToMany(Article).mappedBy('author'),
    refreshToken: p.text().nullable()
  },
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);
