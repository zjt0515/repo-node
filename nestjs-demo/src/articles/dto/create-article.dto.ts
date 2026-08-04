import { UserEntity } from "src/users/entities/user.entity";
import { ArticleStatus } from "../entities/article.entity";
import { Property } from "@mikro-orm/decorators/legacy";
import { PlainObject } from "@mikro-orm/core";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { wrap } from "module";

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