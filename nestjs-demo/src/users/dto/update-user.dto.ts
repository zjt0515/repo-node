import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateUserDTO } from './create-user.dto.js';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refreshToken?: string | null;
}
