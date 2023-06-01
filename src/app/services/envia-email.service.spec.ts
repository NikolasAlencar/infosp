import { TestBed } from '@angular/core/testing';

import { EnviaEmailService } from './envia-email.service';

describe('EnviaEmailService', () => {
  let service: EnviaEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviaEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
