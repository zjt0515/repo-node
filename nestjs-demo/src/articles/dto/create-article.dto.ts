import { PlainObject } from '@mikro-orm/core';
import {
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

import { ArticleStatus } from '../entities/article.entity.js';

export class CreateArticleDTO extends PlainObject {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  content!: string;

  @IsEnum(ArticleStatus)
  status!: ArticleStatus;
}

// wrap(article).assign(dto)
