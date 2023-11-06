import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../../models/todo.model';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit{
  @Output()
  selectedTodo = new EventEmitter<ITodo>();

  todos$: Observable<ITodo[]>;

  selectedTodoItem: ITodo;

  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.todoFacadeService.initTodos();
    this.todos$ = this.todoFacadeService.getTodos();
  }

  onEdit(todoId: number): void {
    this.todoFacadeService.getTodoById(todoId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todoItem) => {
        this.selectedTodoItem = todoItem;
      });
    this.todoFacadeService.editTodo(this.selectedTodoItem);
    this.selectedTodo.emit(this.selectedTodoItem);
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }
}
