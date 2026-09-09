import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';

export class FilterArticleDto extends PaginationDto {
  @IsOptional()
  @IsString()
  query?: string;
}
