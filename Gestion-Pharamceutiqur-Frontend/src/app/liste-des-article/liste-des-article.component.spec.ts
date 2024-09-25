import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesArticleComponent } from './liste-des-article.component';

describe('ListeDesArticleComponent', () => {
  let component: ListeDesArticleComponent;
  let fixture: ComponentFixture<ListeDesArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
