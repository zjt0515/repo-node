import { defineEntity, p } from '@mikro-orm/postgresql';

export const UserSchema = defineEntity({
  name: 'User',
  tableName: 'user_entity',
  properties: {
    id: p.integer().primary(),
    email: p.string().unique(),
    password: p.string(),
  },
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);
