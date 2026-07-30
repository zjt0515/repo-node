import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/users/entities/user.entity';
export class UserFactory extends Factory<UserEntity> {
  model = UserEntity;

  definition(): Partial<UserEntity> {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
