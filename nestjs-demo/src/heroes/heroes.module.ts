import { Module } from '@nestjs/common';

import { HeroesController } from './heroes.controller.js';
import { HeroesService } from './heroes.service.js';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
