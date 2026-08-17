import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto.js';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refreshToken?: string | null
}
