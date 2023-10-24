import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTodoComponent } from './pages/add-new-todo/add-new-todo.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component:AppComponent, pathMatch: 'full' },
  { path: 'addNewTodo', component:  AddNewTodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
