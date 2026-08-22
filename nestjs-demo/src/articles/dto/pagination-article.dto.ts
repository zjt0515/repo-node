import { IsInt, IsPositive } from 'class-validator';

export class PaginationArticleDto {
  @IsInt()
  @IsPositive()
  page!: number;
}
