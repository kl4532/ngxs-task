import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {Select, Store} from "@ngxs/store";
import {CreateTodo, RemoveTodo, ToggleTodo, UpdateTodo} from "../../../stores/todos.actions";
import {TodosState} from "../../../stores/todos.state";
import {HttpClient} from "@angular/common/http";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  @Select(TodosState.todos)
  todos$!: Observable<Todo[]>;

  todos: Todo[] = [];

  constructor(@Inject('API_URL') private url: string,
              private store: Store,
              private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    // return this.todos$
    //     .pipe(
    //         // TOFIX: delay blocks todos somehow
    //         // delay(500 + Math.random() * 1000),
    //     );
    return this.http.get<Todo[]>(this.url);
  }

  addTodo(title: string): Observable<Todo> {
    return this.store.dispatch(new CreateTodo(title))
      .pipe(
        delay(500 + Math.random() * 1000),
        tap((todo) => {
          this.todos.push(todo);
        }),
      );
  }

  removeTodo(id: number): Observable<Todo> {
    return this.store.dispatch(new RemoveTodo(id))
        .pipe(
            delay(500 + Math.random() * 1000),
            tap((todo: Todo) => {
              this.todos.filter(todo => todo.id !== id);
            }),
        );
  }

  updateTodo(id: number, newName: string): Observable<Todo> {
    return this.store.dispatch(new UpdateTodo(id, newName))
        .pipe(
            delay(500 + Math.random() * 1000),
            tap((todo) => {
              this.todos.filter(todo => todo.id !== id);
            }),
        );
  }

  toggleTodo(id: number): Observable<Todo> {
      return this.store.dispatch(new ToggleTodo(id));
  }

}
