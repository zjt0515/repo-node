import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  todos = [
    {
      id: 0,
      title: 'reading',
      content: '1',
      isCompleted: false,
    },
    {
      id: 1,
      title: 'drinking',
      content: '2',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'coding',
      content: '3',
      isCompleted: false,
    },
  ];

  createTodo(newTodo: CreateTodoDto) {
    this.todos.push({ id: Date.now(), ...newTodo });
    return newTodo;
  }

  findOneTodo(id: number) {
    return this.todos.find((todo) => Number(id) === Number(todo.id));
  }

  findAllTodos() {
    return this.todos;
  }

  updateTodo(id: number, updateTodo: UpdateTodoDto) {
    this.todos = this.todos.map((todo) => {
      if (Number(todo.id) === Number(id)) {
        return {
          ...todo,
          ...updateTodo,
        };
      }
      return todo;
    });
    return updateTodo;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => Number(todo.id) !== Number(id));
    return true;
  }
}
