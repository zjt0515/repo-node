import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { HeroEntity } from 'src/heroes/entities/hero.entity';
export class HeroFactory extends Factory<HeroEntity> {
  model = HeroEntity;

  definition(): Partial<HeroEntity> {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
