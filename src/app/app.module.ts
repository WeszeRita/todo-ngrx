import { NgModule, isDevMode } from '@angular/core';
import { todoReducer } from '../store/todo.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TodoService } from '../service/todo.service';
import { FormComponent } from './pages/form/form.component';
import { TodoFacadeService } from '../service/todo-facade.service';
import { TodoEffects } from '../store/todo.effects';
import { todoFeatureKey } from '../store/todo.selectors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CardComponent } from './pages/cards/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([TodoEffects]),
    StoreModule.forRoot({
      [todoFeatureKey]: todoReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [TodoService, TodoFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
