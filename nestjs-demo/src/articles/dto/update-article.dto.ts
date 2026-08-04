import { IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { ArticleStatus } from "../entities/article.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { PlainObject } from "@mikro-orm/core";

export class UpdateArticleDTO extends PlainObject{
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsInt()
  authorId: number;
}

