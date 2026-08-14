import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TodoFactory } from './TodoFactory';
import { UserFactory } from './UserFactory';
import * as fs from 'fs';
import path from 'path';
import { ArticleFactory } from './ArticleFactory';
import { faker } from '@faker-js/faker';


export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // new TodoFactory(em).make(10);
    new UserFactory(em).each((user) => {
      const articleCount = faker.number.int({ min: 0, max: 2})
      
      if(!articleCount)
      {
        return
      }

      user.articles.set(new ArticleFactory(em).make(articleCount))
      
    }).make(10)

    // heroes
    const filePath = path.join(__dirname, '../../herolist.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const heroes: HeroData[] = JSON.parse(fileContent);
    for (const hero of heroes) {
      const Hero = {
        id: hero.ename,
        idName: hero.id_name,
        cName: hero.cname,
        title: hero.title,
        heroType: hero.hero_type,
      };
      // const res = em.create(Hero, Hero);
      // em.persist(res);
    }
  }
}

interface HeroData {
  ename: number;
  cname: string;
  id_name: string;
  title: string;
  new_type: number;
  hero_type: 1 | 2 | 3 | 4 | 5 | 6;
  hero_type2?: 1 | 2 | 3 | 4 | 5 | 6;
  skin_name: string;
  moss_id: number;
}
