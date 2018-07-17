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
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
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

  ngOnInit() {
    const idInputObservable = fromEvent(
      this.idInput.nativeElement,
      'change'
    ).pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      debounceTime(50),
      tap((id: number) => {
        this.store.dispatch(new Actions.SearchClient(id));
      })
    );

    idInputObservable.subscribe();

    this.storeObservable = this.store.pipe(select('signupForm'));
    this.storeObservable.subscribe((state: SignupFormState) => {
      this.state = { ...state };
      this.isClientIdRepeated = state.isClientIdRepeated;

      if (state.isClientIdRepeated) {
        this.form.controls['identity'].setErrors({ repeated: true });
      }
      if (state.wasSubmitted) {
        this.spinnerButtonOptions.active = true;
        this.spinnerButtonOptions.text = 'Registering client...';
      }
      if (state.wasSuccessful) {
        this.spinnerButtonOptions.active = false;
        this.spinnerButtonOptions.text = 'Submit';
        this.snackBar.open('Successful Operation');
      }
    });
  }

  getErrorMessage() {
    return this.isClientIdRepeated
      ? 'There is already a user with this id'
      : 'This field must to be numeric';
  }

  getBirthdateErrorMessage() {
    return this.isAValidBirthdate ? 'Min age 18' : 'This field is required';
  }

  idInputValidator(control: FormControl) {
    const id = control.value;

    if (this.isClientIdRepeated) {
      return { isClientIdRepeated: true, repeatedId: id };
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      const id = this.idInput.nativeElement.value;
      const firstName = this.firstNameInput.nativeElement.value;
      const lastName = this.lastNameInput.nativeElement.value;
      const birthdate = this.birthdateInput.nativeElement.value;

      this.store.dispatch(
        new Actions.RegisterClient(
          new Client(
            id,
            firstName,
            lastName,
            Moment(birthdate, 'MM/DD/YYYY').toISOString()
          )
        )
      );
    }
  }

  onBirthdateChange(dateString) {
    this.selectedBirthdate = dateString;
    const date = Moment(dateString, 'MM/DD/YYYY').toISOString();
    const age = Moment().diff(date, 'years');
    this.isAValidBirthdate = false;
    if (age < 18) {
      this.form.controls['birthDate'].setErrors({ invalidDate: true });
      this.isAValidBirthdate = true;
    }
  }
}
