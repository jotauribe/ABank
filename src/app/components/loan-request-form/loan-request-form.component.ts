import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
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
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import * as Moment from 'moment';

import * as Actions from '../../store/loan-request-form/actions';
import { State as LoanRequestFormState } from '../../store/loan-request-form/reducers';
import { Client } from '../../models/client.model';
import { Employment } from '../../models/employment.model';

export interface DialogData {
  response: string;
  loanAmount: number;
}

@Component({
  selector: 'app-loan-request-form',
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['./loan-request-form.component.css']
})
export class LoanRequestFormComponent implements OnInit {
  form: FormGroup;
  storeObservable: Observable<Object>;
  state: LoanRequestFormState;
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
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.form = formBuilder.group({
      nit: [null, [Validators.required, this.companyNITValidator]],
      companyName: ['', Validators.required],
      salary: [null, [Validators.required, this.salaryValidator]],
      hireDate: [null, [Validators.required, this.hireDateValidator]]
    });
  }

  ngOnInit() {
    this.store
      .pipe(select('loanRequestForm'))
      .subscribe((state: LoanRequestFormState) => {
        if (state.wasSubmitted) {
          this.spinnerButtonOptions.active = true;
          this.spinnerButtonOptions.text = 'Requesting loan...';
        }
        if (state.wasSuccessful) {
          this.spinnerButtonOptions.active = false;
          this.spinnerButtonOptions.text = 'Submit';
          this.snackBar.open('Successful Operation');
          const dialogRef = this.dialog.open(ResponseDialog, {
            width: '250px',
            data: { response: state.response, loanAmount: state.loanAmount }
          });
        }
      });
  }

  companyNITValidator(control: FormControl) {
    const nit = control.value;

    const isNotNumeric = !/^\d+$/.test(nit);
    const isNotNull = nit !== null;
    const isNotAEmptyString = nit !== '';

    if (isNotNumeric && isNotNull && isNotAEmptyString) {
      return {
        isNotNumeric: { value: nit }
      };
    }

    return null;
  }

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

    const isInvalidDate = !hireDate.isValid() || hireDate.isAfter(now);

    if (isInvalidDate) {
      return {
        isInvalidDate: { value: hireDate }
      };
    }

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      const clientId = 123;
      const companyNIT = this.form.controls['nit'].value;
      const companyName = this.form.controls['companyName'].value;
      const salary = this.form.controls['salary'].value;
      const hireDate = this.form.controls['hireDate'].value;

      const company = { nit: companyNIT, name: companyName };

      this.store.dispatch(
        new Actions.SaveEmploymentInfo(
          new Employment(
            clientId,
            company,
            salary,
            Moment(hireDate, 'MM/DD/YYYY').format('MM-DD-YYYY')
          )
        )
      );
    }
  }
}

@Component({
  selector: 'response-dialog',
  templateUrl: 'response-dialog.html'
})
export class ResponseDialog {
  constructor(
    public dialogRef: MatDialogRef<ResponseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
