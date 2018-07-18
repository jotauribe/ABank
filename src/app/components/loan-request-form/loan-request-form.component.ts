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
  loading: Observable<boolean>;

  @ViewChild('nit') idInput: ElementRef;

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
      nit: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      companyName: ['', Validators.required],
      salary: [null, [Validators.required, this.salaryValidator]],
      hireDate: [null, [Validators.required, this.hireDateValidator]]
    });
  }

  ngOnInit() {}

  salaryValidator(control: FormControl) {
    const salary = control.value;

    const isNotNumeric = !/^\d+$/.test(salary);
    const isNegative = salary < 0;
    const isGreaterThan100M = salary > 100000000;

    if (isNotNumeric) {
      return {
        isNotNumeric: { value: salary }
      };
    }

    if (isNegative) {
      return {
        isNegative: { value: salary }
      };
    }

    if (isGreaterThan100M) {
      return {
        isGreaterThan100M: { value: salary }
      };
    }

    return null;
  }

  hireDateValidator(control: FormControl) {
    const now = Moment();
    const hireDate = Moment(control.value, 'MM/DD/YYYY');

    console.log('hireDate', hireDate);

    const isInvalidDate = !hireDate.isValid() || hireDate.isAfter(now);

    if (isInvalidDate) {
      console.log('hireDate IF', hireDate);
      return {
        isInvalidDate: { value: hireDate }
      };
    }

    return null;
  }
}
