import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesFactureComponent } from './lliste-des-commandes.component';

describe('LesFactureComponent', () => {
  let component: LesFactureComponent;
  let fixture: ComponentFixture<LesFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
