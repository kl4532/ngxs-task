import {Component, Input} from '@angular/core';
import {Todo, TodosService} from '../../services/todos.service';
import {RemoveTodo, UpdateTodo} from "../../../../stores/todos.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  editMode = false;
  constructor(private todoService: TodosService,
              private store: Store) {}

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.store.dispatch(new RemoveTodo(id));
  }

  updateTodo(id: number, title: string) {
    this.store.dispatch(new UpdateTodo(id, title));
  }
}
