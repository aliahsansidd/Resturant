import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersummaryComponent } from './registersummary.component';

describe('RegistersummaryComponent', () => {
  let component: RegistersummaryComponent;
  let fixture: ComponentFixture<RegistersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
