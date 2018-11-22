import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatastrophicEventComponent } from './catastrophic-event.component';

describe('CatastrophicEventComponent', () => {
  let component: CatastrophicEventComponent;
  let fixture: ComponentFixture<CatastrophicEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatastrophicEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatastrophicEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
