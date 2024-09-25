import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPageComponent } from './print-page.component';

describe('PrintPageComponent', () => {
  let component: PrintPageComponent;
  let fixture: ComponentFixture<PrintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
