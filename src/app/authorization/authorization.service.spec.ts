import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
