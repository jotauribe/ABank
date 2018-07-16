import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SignUpEffects } from './store/signup-form/effects';
import { reducer as SignUpReducer } from './store/signup-form/reducers';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ClientService } from './services/clientService';

@NgModule({
  declarations: [AppComponent, SignupFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([SignUpEffects]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MaterialModule,
    StoreModule.forRoot({ signupForm: SignUpReducer })
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}
