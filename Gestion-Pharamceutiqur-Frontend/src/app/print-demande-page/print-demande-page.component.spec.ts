import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDemandePageComponent } from './print-demande-page.component';

describe('PrintDemandePageComponent', () => {
  let component: PrintDemandePageComponent;
  let fixture: ComponentFixture<PrintDemandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDemandePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDemandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
