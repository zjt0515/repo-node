import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Todo } from './entities/todo.entity.js';
import { CreateTodoDTO } from './dto/create-todo.dto.js';
import { FilterTodoDTO } from './dto/filter-todo.dto.js';
import { UpdateTodoDTO } from './dto/update-todo.dto.js';

@Injectable()
export class TodoService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDTO) {
    // this.todos.push({ id: Date.now(), ...newTodo });
    // const todo = this.em.create({ ...newTodo });

    // 暂时保存服务端
    const todo = this.todoRepository.create(createTodoDto);
    // 写入
    await this.em.flush();
    return todo;
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async findAll(filterTodoDto: FilterTodoDTO) {
    const { page = 1, limit = 5, orderBy = 'asc' } = filterTodoDto;
    // offset = ..
    const offset = (page - 1) * limit;
    return await this.todoRepository.findAll({
      limit,
      offset,
      orderBy: { id: orderBy },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDTO) {
    // this.todos = this.todos.map((todo) => {
    //   if (Number(todo.id) === Number(id)) {
    //     return {
    //       ...todo,
    //       ...updateTodo,
    //     };
    //   }
    //   return todo;
    // });
    const todo = await this.findOne(id);

    this.em.assign(todo, updateTodoDto);

    await this.em.flush();
    return todo;
  }

  async remove(id: number) {
    // this.todos = this.todos.filter((todo) => Number(todo.id) !== Number(id));
    const todo = await this.findOne(id);

    await this.em.remove(todo).flush();
    return todo;
  }
}
