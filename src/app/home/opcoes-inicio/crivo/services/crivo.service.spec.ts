import { TestBed } from '@angular/core/testing';

import { CrivoService } from './crivo.service';

describe('CrivoService', () => {
  let service: CrivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
