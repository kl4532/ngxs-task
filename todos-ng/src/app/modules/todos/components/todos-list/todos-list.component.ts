import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../services/todos.service';
import {Store} from "@ngxs/store";
import {FormControl, FormGroup} from "@angular/forms";
import {GetTodos, UpdateFilter} from "../../../../stores/todos.actions";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit{
  filterForm = new FormGroup({
    filter: new FormControl('all'),
  });

  constructor(private store: Store, public todosService: TodosService) {}

  ngOnInit() {
    this.store.dispatch(new GetTodos());
    this.filterForm.valueChanges.subscribe(val => {
      this.store.dispatch(new UpdateFilter(val.filter));
    });
  }


}
