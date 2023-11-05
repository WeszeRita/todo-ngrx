import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoFacadeService } from '../service/todo-facade.service';
import { ITodo } from '../models/todo.model';

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
