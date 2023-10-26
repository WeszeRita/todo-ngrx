import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTodoComponent } from './pages/add-new-todo/add-new-todo.component';

// we don't need it
const routes: Routes = [
  { path: 'addNewTodo', component:  AddNewTodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
