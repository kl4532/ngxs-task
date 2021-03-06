import {Todo, TodosService} from '../modules/todos/services/todos.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CreateTodo, GetTodos, RemoveTodo, ToggleTodo, UpdateFilter, UpdateTodo} from './todos.actions';
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

export interface TodosStateModel {
  todos: Todo[];
  filter: string;
}

@State<TodosStateModel>({
  name: 'todosState',
  defaults: {
    todos: [],
    filter: 'all'
  }
})

@Injectable()
export class TodosState {
  counter = 1;

  constructor(private todosService: TodosService) {
  }

  @Selector()
  static todos(state: TodosStateModel) {
    console.log('filter', state.filter);
      if(state.filter === 'all')
        return state.todos;

      if(state.filter === 'done') {
        return state.todos.filter((todo: Todo) => todo.done)
      } else
        return state.todos.filter((todo: Todo) => !todo.done)
  }

  @Action(GetTodos)
  getTodos(context: StateContext<TodosStateModel>) {
    return this.todosService.getTodos().pipe(tap((todos: Todo[]) => {
      const state = context.getState();
      context.patchState( {
        ...state,
        todos: todos,
      })
    }));
  }

  @Action(UpdateFilter)
  updateFilter(context: StateContext<TodosStateModel>, action: UpdateFilter) {
    context.patchState( {
      filter: action.filter
    })
  }

  @Action(RemoveTodo)
  removeTodo(context: StateContext<TodosStateModel>, action: RemoveTodo) {
    this.todosService.removeTodo(action.id).subscribe((todos:Todo[]) =>
        this.getFilteredTodos(context, todos)
    );
  }

  @Action(CreateTodo)
  createTodo(context: StateContext<TodosStateModel>, action: CreateTodo) {
    this.todosService.addTodo(action.title).subscribe((todo: any) => {
      const state = context.getState();
      const todoCopy = [...state.todos];
      todoCopy.push(todo);
      context.patchState( {
        todos: todoCopy
      })
    });
  }

  @Action(UpdateTodo)
  updateTodo(context: StateContext<TodosStateModel>, action: UpdateTodo) {
    const state = context.getState()
    const done = state.todos.find(todo => todo.id === action.id)?.done;
    const todo = {
      title: action.title,
      id: action.id,
      done: done || false
    }

    return this.todosService.updateTodo(todo.id, todo).subscribe((todos:Todo[]) =>
        this.getFilteredTodos(context, todos)
    );
  }

  @Action(ToggleTodo)
  toggleTodo(context: StateContext<TodosStateModel>, action: ToggleTodo) {
    const todo = action.todo;
    todo.done = !todo.done;

    return this.todosService.updateTodo(action.todo.id, todo).subscribe((todos:Todo[]) =>
        this.getFilteredTodos(context, todos)
    );
  }

  // TODO ?? this is performed on backend side when getting all todos, how to avoid duplication when updating?
  // bcs update returns all unflitered todos
  getFilteredTodos(context: StateContext<TodosStateModel>, todos: Todo[]) {
      const filter = this.todosService.filterSearch.value;
      if( filter !== '') {
        todos = todos.filter((todo) => {
          return todo.title.toLowerCase().indexOf(filter) !== -1;
        });
      }
      console.log(this.todosService.filterSearch.value);
      console.log(todos);

      context.patchState( {
        todos: todos
      });
  }

}
