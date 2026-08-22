import { defineEntity, p } from '@mikro-orm/postgresql';

import { Article } from '../../articles/entities/article.entity';
import { Role } from '../../auth/enums/roles.enum';

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.integer().primary(),
    email: p.string(),
    password: p.string(),
    username: p.string().unique(true),
    articles: () => p.oneToMany(Article).mappedBy('author'),
    refreshToken: p.text().nullable(),
    roles: p.enum(() => Role).array().default([Role.User]),
  },
  uniques: [
    { properties: ['email'], where: { deletedAt: null } },
  ],
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);
