import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radioButton.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss'],
  // use OnPush strategy
})
export class AddNewTodoComponent  implements OnInit {
  addNewTodoForm!: FormGroup;

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl('ongoing', Validators.required),
    })
  }

  // getters should be placed above the constructor
  get newTodoTitle() {
    return this.addNewTodoForm.controls['title'];
  }

  onSubmit() {
    // use the value directly as passing argument to function
    const newTodo = { ...this.addNewTodoForm.value};
    this.todoFacadeService.createNewTodo(newTodo);
    this.addNewTodoForm.reset();
  }

  // fields should be moved up
  protected readonly RadioButton = RadioButton;
}
