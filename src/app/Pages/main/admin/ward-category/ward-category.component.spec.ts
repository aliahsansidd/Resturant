import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardCategoryComponent } from './ward-category.component';

describe('WardCategoryComponent', () => {
  let component: WardCategoryComponent;
  let fixture: ComponentFixture<WardCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
