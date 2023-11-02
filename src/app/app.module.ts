import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TodoService } from '../service/todo.service';
import { AddNewTodoComponent } from './pages/add-new-todo/add-new-todo.component';
import { TodoFacadeService } from '../service/todo-facade.service';
import { todoReducer } from '../store/todo.reducer';
import { TodoEffects } from '../store/todo.effects';
import { todoFeatureKey } from '../store/todo.selectors';
import { NgOptimizedImage } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    AddNewTodoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([TodoEffects]),
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(todoFeatureKey, todoReducer),
    NgOptimizedImage,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // they aren't the same, forRoot vs forFeature
  ],
  providers: [TodoService, TodoFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
