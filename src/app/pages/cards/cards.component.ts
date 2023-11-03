import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../../models/todo.model';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonTitle } from '../../../constants/button-title.enum';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit{
  todos$: Observable<ITodo[]>

  @Output()
  selectedTodo = new EventEmitter<ITodo>();

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
    this.selectedTodo.emit(this.selectedTodoItem)

    this.todoFacadeService.editTodo(this.selectedTodoItem);
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }
}
