import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {SearchTodos} from "../../../../stores/todos.actions";

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent implements AfterViewInit {

  @ViewChild('input')
  input: ElementRef | undefined;
  sub: Subscription | undefined;
  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    this.sub = fromEvent(this.input?.nativeElement, 'input').pipe(
        debounceTime(250),
        tap(() => {
          console.log('Search todo', this.input?.nativeElement.value);
          const filter = this.input?.nativeElement.value;
          return this.store.dispatch(new SearchTodos(filter));
        })
    ).subscribe();
  }

}
