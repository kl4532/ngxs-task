import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import { TodosFormComponent } from './components/todos-form/todos-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {environment} from "../../../environments/environment";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    HttpClientModule
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
  providers: [
    {
      provide: 'API_URL',
      useValue: environment.API_URL,
    },
  ],
})
export class TodosModule {
}
