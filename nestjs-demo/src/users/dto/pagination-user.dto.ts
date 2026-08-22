import { IsInt, IsPositive } from 'class-validator';

export class PaginationUserDto {
  @IsInt()
  @IsPositive()
  page!: number;
}
