import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestPageComponent } from './loan-request-page.component';

describe('LoanRequestPageComponent', () => {
  let component: LoanRequestPageComponent;
  let fixture: ComponentFixture<LoanRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
