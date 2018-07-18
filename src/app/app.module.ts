import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SignUpEffects } from './store/signup-form/effects';
import { LoanRequestEffects } from './store/loan-request-form/effects';
import { reducer as SignUpReducer } from './store/signup-form/reducers';
import { reducer as LoanRequestFormReducer } from './store/loan-request-form/reducers';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ClientService } from './services/clientService';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoanRequestPageComponent } from './components/loan-request-page/loan-request-page.component';
import {
  LoanRequestFormComponent,
  ResponseDialog
} from './components/loan-request-form/loan-request-form.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  { path: 'loan-request', component: LoanRequestPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    SignupPageComponent,
    LoanRequestPageComponent,
    LoanRequestFormComponent,
    ResponseDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([SignUpEffects, LoanRequestEffects]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({
      signupForm: SignUpReducer,
      loanRequestForm: LoanRequestFormReducer
    })
  ],
  entryComponents: [ResponseDialog],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}
