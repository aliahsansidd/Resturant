import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdRegistrationViewComponent } from './opd-registration-view.component';
describe('OpdRegistrationComponent', () => {
  let component: OpdRegistrationViewComponent;
  let fixture: ComponentFixture<OpdRegistrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdRegistrationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdRegistrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
