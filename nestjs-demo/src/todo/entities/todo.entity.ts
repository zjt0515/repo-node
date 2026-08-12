// import { TodoEntity } from '../odo/entities/todo.entity';
// import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { defineEntity, p } from '@mikro-orm/core';

// @Entity()
// export class TodoEntity {
//   @PrimaryKey()
//   id: number;

//   @Property()
//   title: string;

//   @Property()
//   content: string;

//   @Property()
//   isCompleted: boolean;
// }

export const TodoSchema = defineEntity({
  name: 'Todo',
  tableName: 'todo_entity',
  properties: {
    id: p.integer().primary(),
    title: p.string(),
    content: p.text(),
    isCompleted: p.boolean(),
  },
});

export class TodoEntity extends TodoSchema.class {}
TodoSchema.setClass(TodoEntity);
