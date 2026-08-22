import { PlainObject } from '@mikro-orm/core';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto extends PlainObject {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
