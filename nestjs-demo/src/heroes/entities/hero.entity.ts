import { defineEntity, p } from '@mikro-orm/postgresql';

export const HeroSchema = defineEntity({
  name: 'Hero',
  properties: {
    id: p.integer().primary(),
    idName: p.string(),
    cName: p.string(),
    title: p.string(),
    heroType: p.enum(() => HeroType),
    heroType2: p.enum(() => HeroType),
  },
});

export enum HeroType {
  _,
  // 战士
  WARRIOR,
  MAGA,
  TANK,
  // 刺客
  ASSASSIN,
  ADC,
  SUPPORT,
}

export class HeroEntity extends HeroSchema.class {}
HeroSchema.setClass(HeroEntity);
