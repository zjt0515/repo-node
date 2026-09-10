import { IsString } from "class-validator";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { CreateCommentDto } from "./create-comment.dto";

export class FilterCommentsDto extends PaginationDto  {
  @IsString()
  content: string
}