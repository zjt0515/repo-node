import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service.js';
import { Public } from './decorator/public.decorator.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { SignUpDto } from './dto/sign-up.dto.js';
import { AuthGuard } from './guard/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  signOut(@Req() req: any) {
    return this.authService.signOut(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @Public()
  refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }
}
