import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLivraisonsComponent } from './print-livraisons.component';

describe('PrintLivraisonsComponent', () => {
  let component: PrintLivraisonsComponent;
  let fixture: ComponentFixture<PrintLivraisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLivraisonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintLivraisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
