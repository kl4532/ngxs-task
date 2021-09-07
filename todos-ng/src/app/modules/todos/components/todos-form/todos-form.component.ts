import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {CreateTodo} from "../../../../stores/todos.actions";

@Component({
  selector: 'app-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.scss']
})
export class TodosFormComponent {
  constructor(private store: Store) {
  }

  addTodo(todoName: string) {
    this.store.dispatch(new CreateTodo(todoName));
  }
}
