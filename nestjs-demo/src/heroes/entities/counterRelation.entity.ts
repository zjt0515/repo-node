import { defineEntity, p } from '@mikro-orm/postgresql';
import { Hero } from './hero.entity';

export const CounterRelationSchema = defineEntity({
  name: 'CounterRelation',
  properties: {
    id: p.integer().primary(),
    lane:  p.enum(() => LANE),
    hero: () => p.manyToOne(Hero),
    targetHero: () => p.manyToOne(Hero),
    strength: p.tinyint(),
    desc: p.text(),
  },
});

// 分路
export enum LANE {
  TOP = 'top',
  JUNGLE = 'jungle',
  MID = 'mid',
  ADC = 'adc',
  SUPPORT = 'support',
}

export class CounterRelationEntity extends CounterRelationSchema.class {}
CounterRelationSchema.setClass(CounterRelationEntity);
