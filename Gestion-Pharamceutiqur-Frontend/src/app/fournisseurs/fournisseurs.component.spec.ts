import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursComponent } from './fournisseurs.component';

describe('FournisseursComponent', () => {
  let component: FournisseursComponent;
  let fixture: ComponentFixture<FournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
