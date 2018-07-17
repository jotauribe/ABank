import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ButtonOpts } from 'mat-progress-buttons';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as Moment from 'moment';

import * as Actions from '../../store/signup-form/actions';
import { State as SignupFormState } from '../../store/signup-form/reducers';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-loan-request-form',
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['./loan-request-form.component.css']
})
export class LoanRequestFormComponent implements OnInit {
  form: FormGroup;
  storeObservable: Observable<Object>;
  state: SignupFormState;
  isClientIdRepeated: boolean;
  selectedBirthdate: Date;
  isAValidBirthdate = true;

  @ViewChild('idInput') idInput: ElementRef;
  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('birthdateInput') birthdateInput: ElementRef;

  loading: Observable<boolean>;

  spinnerButtonOptions: ButtonOpts = {
    active: false,
    text: 'Submit',
    spinnerSize: 18,
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Object>,
    public snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      identity: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])
      ],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required]
    });
  }

  ngOnInit() {}
}
