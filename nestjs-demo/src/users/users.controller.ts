import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { CreateUserDTO } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('Users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() filterUserDto: FilterUserDto) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response: Response) {
    return this.usersService.remove(id);
  }
}
