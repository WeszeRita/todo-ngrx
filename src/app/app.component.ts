import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { TodoFacadeService } from '../service/todo-facade.service';
import { ButtonTitle } from '../constants/button-title.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  todos$: Observable<ITodo[]>
  // selectedTodo: ITodo;
  // isEditing = false;
  // buttonText = ButtonTitle.addNewTodo;

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.todoFacadeService.initTodos();
    this.todos$ = this.todoFacadeService.getTodos();
  }

  // onEdit(todoId: number): void {
  //   this.isEditing = true;
  //
  //   this.todoFacadeService.getTodoById(todoId)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe((todoItem) => {
  //       this.selectedTodo = todoItem;
  //     })
  //
  //   this.todoFacadeService.editTodo(this.selectedTodo);
  //
  // }
  //
  // onDeleteTodo(id: number): void {
  //   this.todoFacadeService.removeTodo(id);
  // }
}
