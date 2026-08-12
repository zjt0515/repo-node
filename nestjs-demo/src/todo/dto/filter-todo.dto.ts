import { PlainObject } from '@mikro-orm/core';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

export class FilterTodoDTO extends PlainObject {
  @IsInt()
  @IsOptional()
  page!: number;

  @IsInt()
  @IsOptional()
  limit!: number;

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy!: OrderBy;
}
