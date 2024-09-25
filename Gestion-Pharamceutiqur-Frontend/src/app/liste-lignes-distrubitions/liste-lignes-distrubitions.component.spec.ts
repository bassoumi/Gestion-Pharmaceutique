import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLignesDistrubitionsComponent } from './liste-lignes-distrubitions.component';

describe('ListeLignesDistrubitionsComponent', () => {
  let component: ListeLignesDistrubitionsComponent;
  let fixture: ComponentFixture<ListeLignesDistrubitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLignesDistrubitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLignesDistrubitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
