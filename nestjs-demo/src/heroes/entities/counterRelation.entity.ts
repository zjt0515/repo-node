import { defineEntity, p } from '@mikro-orm/postgresql';
import { HeroEntity } from './hero.entity';

export const CounterRelationSchema = defineEntity({
  name: 'CounterRelation',
  properties: {
    id: p.integer().primary(),
    lane: 
    hero: () => p.manyToOne(HeroEntity),
    targetHero: () => p.manyToOne(HeroEntity),
    strength: p.tinyint(),
    desc: p.text(),
  },
});

// 分路
export enum LANE {
  TOP,
  JUNGLE,
  MID,
  ADC,
  SUPPORT,
}

export class CounterRelationEntity extends CounterRelationSchema.class {}
CounterRelationSchema.setClass(CounterRelationEntity);
