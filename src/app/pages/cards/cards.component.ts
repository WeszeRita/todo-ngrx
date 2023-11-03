import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';
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
export class CardsComponent {
  todos$: Observable<ITodo[]>

  @Output() selectedTodo: EventEmitter<ITodo> = new EventEmitter;
  isEditing = false;
  selectedTodoItem: ITodo;


  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef) {}

  onEdit(todoId: number): void {
    this.isEditing = true;


    this.todoFacadeService.getTodoById(todoId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todoItem) => {
        this.selectedTodoItem = todoItem;
      })
    this.selectedTodo.emit(this.selectedTodoItem)
    // this.todoFacadeService.editTodo(this.selectedTodo);

  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }

}
