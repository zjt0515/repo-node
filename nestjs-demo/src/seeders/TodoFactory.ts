import { Factory } from '@mikro-orm/seeder';
import { TodoEntity } from 'src/todo/entities/todo.entity';
import { faker } from '@faker-js/faker';
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
