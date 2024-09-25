import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesFournisseursComponent } from './liste-des-fournisseurs.component';

describe('ListeDesFournisseursComponent', () => {
  let component: ListeDesFournisseursComponent;
  let fixture: ComponentFixture<ListeDesFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
