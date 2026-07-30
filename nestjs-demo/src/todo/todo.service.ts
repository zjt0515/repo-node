import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { FilterTodoDto } from './dto/filter-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: EntityRepository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
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

  async findAll(filterTodoDto: FilterTodoDto) {
    const { page = 1, limit = 5, orderBy = 'asc' } = filterTodoDto;
    // offset = ..
    const offset = (page - 1) * limit;
    return await this.todoRepository.findAll({
      limit,
      offset,
      orderBy: { id: orderBy },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
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
