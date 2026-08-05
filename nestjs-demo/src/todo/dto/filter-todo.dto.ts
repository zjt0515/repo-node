import { IsEnum, IsInt, IsOptional } from 'class-validator';

enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

export class FilterTodoDTO {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy?: OrderBy;
}
