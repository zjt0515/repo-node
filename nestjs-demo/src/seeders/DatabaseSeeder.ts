import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TodoFactory } from './TodoFactory.js';
import { UserFactory } from './UserFactory.js';
import path, { dirname } from 'path';
import * as fs from 'fs';
import { Hero } from 'src/heroes/entities/hero.entity.js';
import { title } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new TodoFactory(em).make(10);
    new UserFactory(em).make(10);

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
    await em.flush();
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
