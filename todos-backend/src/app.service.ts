import { Injectable } from "@nestjs/common";
import { CreateTodoBody } from "./app.controller";

export interface Todo {
  title: string;
  done: boolean;
  id: number;
}

@Injectable()
export class AppService {
  todos: Todo[] = [
    {
      title: "Foo",
      id: 1,
      done: false,
    },
    {
      title: "Foo2",
      id: 2,
      done: true,
    }
  ];

  counter = 4;

  getAll(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  getById(id: number): Promise<Todo> {
    return Promise.resolve(this.todos.find((todo: Todo) => todo.id === id));
  }

  create(body: CreateTodoBody) {
    const todo: Todo = {
      title: body.title,
      id: this.counter,
      done: false,
    };

    this.todos.push(todo);
    this.counter += 1;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(todo);
      }, Math.random() * 2000);
    });
  }

  updateTodo(id: number, body: Todo) {
    this.todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.title = body.title;
        todo.done = body.done;
        console.log('updated todo: ', todo);
        return todo;
      }
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.todos);
      }, Math.random() * 2000);
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    return Promise.resolve(this.todos);
  }
}
