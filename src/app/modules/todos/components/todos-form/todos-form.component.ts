import {Component} from '@angular/core';
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.scss']
})
export class TodosFormComponent {
  constructor(private todosService: TodosService) {
  }

  addTodo(todoName: string) {
    this.todosService.addTodo(todoName);
  }
}
