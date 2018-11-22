import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationAccidentCaseComponent } from './patient-registration-accident-case.component';

describe('PatientRegistrationAccidentCaseComponent', () => {
  let component: PatientRegistrationAccidentCaseComponent;
  let fixture: ComponentFixture<PatientRegistrationAccidentCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegistrationAccidentCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegistrationAccidentCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
