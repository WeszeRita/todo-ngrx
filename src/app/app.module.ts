import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoService } from '../service/todo.service';
import { AddNewTodoComponent } from './pages/add-new-todo/add-new-todo.component';
import { TodoFacadeService } from '../service/todo-facade.service';
import { todoFeatureKey, todoReducer } from '../store/todo.reducer';
import { TodoEffects } from '../store/todo.effects';

@NgModule({
  declarations: [
    AppComponent,
    AddNewTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([TodoEffects]),
    StoreModule.forFeature(todoFeatureKey, todoReducer),
  ],
  providers: [TodoService, TodoFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
