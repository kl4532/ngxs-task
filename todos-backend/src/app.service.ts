import { Injectable } from "@nestjs/common";
import { CreateTodoBody } from "./app.controller";
import {delay, of} from "rxjs";

export interface Todo {
  title: string;
  done: boolean;
  id: number;
}

@Injectable()
export class AppService {

  // todos: Todo[] = Array.apply(null, Array(100)).map((_, i: number) => {
  //   const d = new Date().toISOString();
  //   console.log('d', d);
  //   return {
  //     id: i + 1,
  //     done: Math.random() < 0.7,
  //     title: 'Test Lorem ' + i,
  //     updatedAt: d,
  //     createdAt: d
  //   } as Todo;
  // });

  todos: Todo[] = [
    {
      title: 'Foo',
      id: 1,
      done: false,
    },
    {
      title: 'Foo2',
      id: 2,
      done: true,
    },
  ];

  counter = 1000;

  // getAll(): Promise<Todo[]> {
  //   return Promise.resolve(this.todos);
  // }

  getAll(q = '', done?: boolean | undefined) {
    let todos: Todo[] = [];

    if (q) {
      q = q.toLowerCase().trim();

      todos = this.todos.filter((todo) => {
        return todo.title.toLowerCase().indexOf(q) !== -1;
      });
    } else {
      todos = this.todos;
    }

    if (done !== undefined) {
      todos = todos.filter((t) => t.done === done);
    }

    return of(todos).pipe(delay(Math.random() * 2000));
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
