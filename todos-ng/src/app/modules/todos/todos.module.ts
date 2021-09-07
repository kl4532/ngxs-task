import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import { TodosFormComponent } from './components/todos-form/todos-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {environment} from "../../../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TodoSearchComponent } from './components/todo-search/todo-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [
    TodosListComponent,
    TodoItemComponent,
    TodosFormComponent,
    TodoSearchComponent,
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
