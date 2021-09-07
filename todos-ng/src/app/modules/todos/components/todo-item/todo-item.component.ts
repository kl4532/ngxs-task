import {Component, Input, OnChanges} from '@angular/core';
import {Todo, TodosService} from '../../services/todos.service';
import {RemoveTodo, ToggleTodo, UpdateTodo} from "../../../../stores/todos.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  editMode = false;
  constructor(private todoService: TodosService) {}

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  updateTodo(id: number, title: string) {
    this.todoService.updateTodo(id, title);
  }
}
