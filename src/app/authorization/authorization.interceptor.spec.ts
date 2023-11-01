import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorizationInteceptor } from './authorization.interceptor';
import { AuthorizationService } from './authorization.service';
import { of } from 'rxjs';

describe('AuthorizationInterceptor', () => {
  let interceptor: AuthorizationInteceptor;
  let authService: jasmine.SpyObj<AuthorizationService>;
  let httpHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthorizationService', ['getAuthenticatedUser']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthorizationInteceptor,
        { provide: AuthorizationService, useValue: authServiceSpy },
        { provide: HttpHandler, useValue: httpHandlerSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInteceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(AuthorizationInteceptor);
    authService = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;
    httpHandler = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not append token to request headers if the URL does not require authorization', () => {
    const request = new HttpRequest<any>('GET', '/assets/data');
    authService.getAuthenticatedUser.and.returnValue({ access_token: 'mockToken' });

    interceptor.intercept(request, httpHandler);

    expect(httpHandler.handle).toHaveBeenCalledWith(request);
  });
});
