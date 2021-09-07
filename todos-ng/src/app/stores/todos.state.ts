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
      console.log('todos from backnd', todos);
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

  @Action(ToggleTodo)
  toggleTodo(context: StateContext<TodosStateModel>, action: ToggleTodo) {
    const state = context.getState();
    state.todos.map(todo => {
      if(todo.id === action.id) {
        todo.done = !todo.done;
        return todo;
      }
      return todo
    });
    const todoCopy = [...state.todos];
    context.patchState( {
      todos: todoCopy
    })
  }

  @Action(RemoveTodo)
  removeTodo(context: StateContext<TodosStateModel>, action: RemoveTodo) {
    const state = context.getState();
    const todos = state.todos.filter(todo => todo.id !== action.id);
    context.patchState( {
      todos: todos
    })
  }

  @Action(CreateTodo)
  createTodo(context: StateContext<TodosStateModel>, action: CreateTodo) {
    console.log('CreateTodo method executed');
    console.log('context', context);
    console.log('action', action);

    const todo: Todo = {
      title: action.title,
      done: false,
      id: this.counter
    }

    this.counter += 1;

    const state = context.getState();
    const todoCopy = [...state.todos];
    todoCopy.push(todo);

    context.patchState( {
      todos: todoCopy
    })

    console.log('state', state);
  }

  @Action(UpdateTodo)
  updateTodo(context: StateContext<TodosStateModel>, action: UpdateTodo) {
    const state = context.getState();
    const todos = state.todos.map((todo: Todo) => {
      if(todo.id === action.id) {
        todo.title = action.newTitle;
      }
      return todo;
    });
    context.patchState( {
      todos: todos
    })
  }

}
