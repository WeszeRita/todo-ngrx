import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TodoService, TodoFacadeService } from '../service';
import { FormComponent, CardComponent } from './pages';
import { TodoEffects, todoFeatureKey, todoReducer } from '../store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
