import { Factory } from '@mikro-orm/seeder';

import { Hero } from '../heroes/entities/hero.entity';

export class HeroFactory extends Factory<Hero> {
  model = Hero;

  definition(): Partial<Hero> {
    return {
      // email: faker.internet.email(),
      // password: faker.internet.password(),
    };
  }
}
