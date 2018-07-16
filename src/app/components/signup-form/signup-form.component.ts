import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
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

  @ViewChild('idInput') idInput: ElementRef;
  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('birthdateInput') birthdateInput: ElementRef;

  loading: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store<Object>) {
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
        console.log('LOADING');
      }
    });
  }

  getErrorMessage() {
    return this.isClientIdRepeated
      ? 'There is already a user with this id'
      : 'This field must to be numeric';
  }

  idInputValidator(control: FormControl) {
    const id = control.value;

    if (this.isClientIdRepeated) {
      return { isClientIdRepeated: true, repeatedId: id };
    }
    return null;
  }

  onSubmit() {
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
