import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radioButton.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss'],
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

  get newTodoTitle() {
    return this.addNewTodoForm.controls['title'];
  }

  onSubmit() {
    const newTodo = { ...this.addNewTodoForm.value};
    this.todoFacadeService.createNewTodo(newTodo);
    this.addNewTodoForm.reset();
  }

  protected readonly RadioButton = RadioButton;
}
