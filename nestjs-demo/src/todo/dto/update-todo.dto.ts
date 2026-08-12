import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDTO } from './create-todo.dto.js';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {}
