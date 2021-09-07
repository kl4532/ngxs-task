import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from "@ngxs/store";
import {ToggleTodo} from "../../../stores/todos.actions";
import {TodosState} from "../../../stores/todos.state";
import {HttpClient} from "@angular/common/http";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface CreateTodoBody {
    title: string;
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
    return this.http.get<Todo[]>(this.url);
  }

  addTodo(title: string): Observable<CreateTodoBody> {
    return this.http.post<CreateTodoBody>(this.url, {title: title});
  }

  removeTodo(id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>(this.url + id);
  }

  updateTodo(id: number, title: string): Observable<Todo[]> {
    return this.http.put<Todo[]>(this.url + id, {title: title});
  }

  toggleTodo(id: number): Observable<Todo> {
      return this.store.dispatch(new ToggleTodo(id));
  }

}
