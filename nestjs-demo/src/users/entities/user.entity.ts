import { defineEntity, p } from '@mikro-orm/postgresql';

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.integer().primary(),
    email: p.string().unique(),
    password: p.string(),
  },
});

export class UserEntity extends UserSchema.class {}
UserSchema.setClass(UserEntity);
