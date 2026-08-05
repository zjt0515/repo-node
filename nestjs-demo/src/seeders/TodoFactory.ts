import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { TodoEntity } from 'src/todo/entities/todo.entity.js';
export class TodoFactory extends Factory<TodoEntity> {
  model = TodoEntity;

  definition(): Partial<TodoEntity> {
    return {
      title: faker.book.title(),
      content: faker.lorem.text(),
      isCompleted: faker.datatype.boolean(),
    };
  }
}
