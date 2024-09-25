import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesLivraisonsComponent } from './liste-des-livraisons.component';

describe('ListeDesLivraisonsComponent', () => {
  let component: ListeDesLivraisonsComponent;
  let fixture: ComponentFixture<ListeDesLivraisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesLivraisonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesLivraisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
