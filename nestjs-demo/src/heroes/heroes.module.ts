import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service.js';
import { HeroesController } from './heroes.controller.js';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
