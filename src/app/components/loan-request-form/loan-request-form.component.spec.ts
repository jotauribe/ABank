import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestFormComponent } from './loan-request-form.component';

describe('LoanRequestFormComponent', () => {
  let component: LoanRequestFormComponent;
  let fixture: ComponentFixture<LoanRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
