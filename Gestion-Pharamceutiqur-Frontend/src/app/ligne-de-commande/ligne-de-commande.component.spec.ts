import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneDeCommandeComponent } from './ligne-de-commande.component';

describe('LigneDeCommandeComponent', () => {
  let component: LigneDeCommandeComponent;
  let fixture: ComponentFixture<LigneDeCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneDeCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
