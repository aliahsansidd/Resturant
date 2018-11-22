import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientinvoiceComponent } from './patientinvoice.component';

describe('PatientinvoiceComponent', () => {
  let component: PatientinvoiceComponent;
  let fixture: ComponentFixture<PatientinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
