import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radioButton.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTodoComponent  implements OnInit {
  addNewTodoForm!: FormGroup;
  isNewTodoSavedMessage = false;
  readonly radioButton = RadioButton;

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      newTodoTitle: new FormControl(null, Validators.required),
      newTodoTitleStatus: new FormControl(null, Validators.required),
    })
  }

  get newTodoTitle() {
    return this.addNewTodoForm.controls['newTodoTitle']
  }

  onSubmit() {
    const newTodo = { ...this.addNewTodoForm.value};
    console.log(newTodo);
    this.todoFacadeService.createNewTodo(newTodo);
    this.addNewTodoForm.reset();
  }

  protected readonly RadioButton = RadioButton;
}
