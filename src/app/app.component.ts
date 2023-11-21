import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ITodo } from '../models';
import { TodoFacadeService } from '../service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$: Observable<ITodo[]>;
  editedId: number;

  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.todoFacadeService.loadTodos();
    this.todos$ = this.todoFacadeService.getTodos();

    this.todoFacadeService.getEditingTodoId()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: number) => {
        this.editedId = id;
      });
  }

  trackByTodoId(_, todo: ITodo) {
    return todo.id;
  }
}
