import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdSummaryComponent } from './opd-summary.component';

describe('OpdSummaryComponent', () => {
  let component: OpdSummaryComponent;
  let fixture: ComponentFixture<OpdSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
