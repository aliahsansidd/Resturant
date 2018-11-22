import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentregistrationComponent } from './appointmentregistration.component';

describe('AppointmentregistrationComponent', () => {
  let component: AppointmentregistrationComponent;
  let fixture: ComponentFixture<AppointmentregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
