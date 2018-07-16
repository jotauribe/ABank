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

import * as Actions from '../../store/signup-form/actions';
import { State as SignupFormState } from '../../store/signup-form/reducers';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  storeObservable: Observable<Object>;
  state: SignupFormState;
  isClientIdRepeated: boolean;

  @ViewChild('idInput') idInput: ElementRef;

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
        console.log('BEFORE DISPATCH', id);
        this.store.dispatch(new Actions.SearchClient(id));
      })
    );

    idInputObservable.subscribe();

    this.storeObservable = this.store.pipe(select('signupForm'));
    this.storeObservable.subscribe((data: SignupFormState) => {
      this.state = { ...data };
      console.log('DATA FROM SUBSCRIPTION', this.state);
      this.isClientIdRepeated = data.isClientIdRepeated;
      if (data.isClientIdRepeated) {
        console.log(this.isClientIdRepeated);
        this.form.controls['identity'].setErrors({ repeated: true });
      }
    });
  }

  ngOnChanges(changes) {
    console.log('', changes);
  }

  getErrorMessage() {
    return this.isClientIdRepeated
      ? 'There is already a user with this id'
      : 'This field must to be numeric';
  }

  idInputValidator(control: FormControl) {
    const id = control.value;
    console.log('FROM CUSTOM VALIDATOR ', id, this.isClientIdRepeated);

    if (this.isClientIdRepeated) {
      return { isClientIdRepeated: true, repeatedId: id };
    }
    return null;
  }

  onSubmit() {
    console.log('Submit');
  }
}
