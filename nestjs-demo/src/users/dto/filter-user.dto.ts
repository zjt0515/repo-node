import { IsInt, IsPositive, IsString } from 'class-validator';

import { PaginationUserDto } from './pagination-user.dto';

export class FilterUserDto extends PaginationUserDto {
  @IsString()
  query!: string;
}
