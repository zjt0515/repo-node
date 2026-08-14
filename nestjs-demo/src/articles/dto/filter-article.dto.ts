import { IsOptional, IsString } from "class-validator";
import { PaginationArticleDto } from "./pagination-article.dto";

export class FilterArticleDto extends PaginationArticleDto {
  @IsOptional()
  @IsString()
  query?: string
}