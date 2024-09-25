import { TestBed } from '@angular/core/testing';

import { FournisseurService } from './fournisseur.service';

describe('FournisseurService', () => {
  let service: FournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
