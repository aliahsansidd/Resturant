import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OPDAddComponent } from './opd-add.component';


describe('AddOPDComponent', () => {
  let component: OPDAddComponent;
  let fixture: ComponentFixture<OPDAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPDAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPDAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
