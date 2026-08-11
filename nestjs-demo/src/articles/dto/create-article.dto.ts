import { ArticleStatus } from "../entities/article.entity.js";
import { PlainObject } from "@mikro-orm/core";
import { IsEnum, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateArticleDTO extends PlainObject{
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(2048)
  content: string;

  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsPositive()
  authorId: number;
}

// wrap(article).assign(dto)