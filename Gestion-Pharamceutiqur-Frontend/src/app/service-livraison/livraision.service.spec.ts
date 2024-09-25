import { TestBed } from '@angular/core/testing';

import { LivraisionService } from './livraision.service';

describe('LivraisionService', () => {
  let service: LivraisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivraisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
