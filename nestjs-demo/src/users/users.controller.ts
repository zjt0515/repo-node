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
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { CreateUserDTO } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('Users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Post('me/:id')
  @ApiBearerAuth()
  updateByUser(@Req() req: any, @Body() updateUserDTO: UpdateUserDTO){
    const userId = Number(req.user.sub)
    return this.usersService.updateByUser(userId, updateUserDTO)
  }

  @Patch('admin/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('admin')
  @Roles(Role.Admin)
  findAll(@Query() filterUserDto: FilterUserDto) {
    return this.usersService.findAll(filterUserDto)
  }

  @Delete('admin/:id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  remove(@Param('id') id: number, @Res() response: Response) {
    return this.usersService.remove(id);
  }
}
