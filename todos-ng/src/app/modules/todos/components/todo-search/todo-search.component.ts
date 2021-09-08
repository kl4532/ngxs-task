import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {GetTodos} from "../../../../stores/todos.actions";

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
    const input = this.input?.nativeElement
    this.sub = fromEvent(input, 'input').pipe(
        debounceTime(250),
        distinctUntilChanged(),
        map(() => input.value),
        switchMap((filter: string) => this.store.dispatch(new GetTodos(filter)))
    ).subscribe();
  }

}
