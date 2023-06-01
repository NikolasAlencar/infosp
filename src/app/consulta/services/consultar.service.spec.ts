import { TestBed } from '@angular/core/testing';

import { ConsultarService } from './consultar.service';

describe('ConsultarService', () => {
  let service: ConsultarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
