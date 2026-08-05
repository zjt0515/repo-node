import { PartialType } from '@nestjs/swagger';
import { CreateHeroDto } from './create-hero.dto.js';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {}
