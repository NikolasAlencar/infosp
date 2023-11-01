import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { AuthorizationService } from './authorization.service';
import { of } from 'rxjs';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authServiceSpy: jasmine.SpyObj<AuthorizationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routerStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>;

  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthorizationService', ['isUserAuthenticated']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthorizationGuard,
        { provide: AuthorizationService, useValue: authServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: RouterStateSnapshot, useValue: {} as RouterStateSnapshot },
      ],
    });

    guard = TestBed.inject(AuthorizationGuard);
    authServiceSpy = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    routerStateSnapshot = TestBed.inject(RouterStateSnapshot) as jasmine.SpyObj<RouterStateSnapshot>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canActivate return true and not redirect to login if user is authenticated', () => {
    authServiceSpy.isUserAuthenticated.and.returnValue(true);
    const result = guard.canActivate(null!, routerStateSnapshot);
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should canActivate return false and redirect to login if user is not authenticated', () => {
    authServiceSpy.isUserAuthenticated.and.returnValue(false);
    const result = guard.canActivate(null!, routerStateSnapshot);
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Write similar tests for canActivateChild and canLoad if necessary
});
