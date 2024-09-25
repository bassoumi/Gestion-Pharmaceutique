import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateComponent } from './patient-update.component';

describe('PatientUpdateComponent', () => {
  let component: PatientUpdateComponent;
  let fixture: ComponentFixture<PatientUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
