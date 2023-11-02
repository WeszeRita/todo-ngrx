import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton} from '../../../constants/radio-button.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ITodo } from '../../../models/todo.model';

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTodoComponent  implements OnInit, OnChanges {
  protected readonly RadioButton = RadioButton;
  addNewTodoForm: FormGroup;
  @Input()
  todo: ITodo;

  get newTodoTitle() {
    return this.addNewTodoForm.controls['title'];
  }

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['todo']) {
      this.addNewTodoForm.setValue(this.todo);
    }
  }

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl('ongoing', Validators.required),
    })
  }


  onSubmit() {
    const newTodo = this.addNewTodoForm.value;
    this.todoFacadeService.createNewTodo(newTodo);
    this.addNewTodoForm.reset();
  }

}
