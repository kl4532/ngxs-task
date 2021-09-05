import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import { TodosFormComponent } from './components/todos-form/todos-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ],
  declarations: [
    TodosListComponent,
    TodoItemComponent,
    TodosFormComponent,
  ],
  exports: [
    TodoItemComponent,
    TodosListComponent,
    TodosFormComponent,
  ],
})
export class TodosModule {
}
