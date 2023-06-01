import { TestBed } from '@angular/core/testing';

import { EnviaMensagemService } from './envia-mensagem.service';

describe('EnviaMensagemService', () => {
  let service: EnviaMensagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviaMensagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
