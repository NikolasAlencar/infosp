import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthorizationService } from '../authorization/authorization.service';
import { FormBuilder } from '@angular/forms';
import { NavigateService } from '../services/navigate.service';
import { ErrorService } from '../services/error.service';
import { of, throwError } from 'rxjs';
import { User } from '../authorization/model/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthorizationService>;
  let navigateServiceSpy: jasmine.SpyObj<NavigateService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    const authService = jasmine.createSpyObj('AuthorizationService', ['login', 'logout']);
    const navigateService = jasmine.createSpyObj('NavigateService', ['navegarParaFeed', 'navegarParaRegistro', 'adicionaHistoria']);
    const errorService = jasmine.createSpyObj('ErrorService', ['erroConsulta']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthorizationService, useValue: authService },
        { provide: NavigateService, useValue: navigateService },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: ErrorService, useValue: errorService }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;
    navigateServiceSpy = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
    errorServiceSpy = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to feed after successful login', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of(null as unknown as User));

    component.login.controls['usuario'].setValue('testuser');
    component.login.controls['senha'].setValue('testpassword');
    component.entrar();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ usuario: 'testuser', senha: 'testpassword' });
    expect(navigateServiceSpy.navegarParaFeed).toHaveBeenCalled();
  }));

  it('should show error message if login fails', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(throwError('error'));

    component.login.controls['usuario'].setValue('testuser');
    component.login.controls['senha'].setValue('testpassword');
    component.entrar();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ usuario: 'testuser', senha: 'testpassword' });
    expect(errorServiceSpy.erroConsulta).toHaveBeenCalled();
  }));

  it('should navigate to registration page when registrar is called', () => {
    component.registrar();
    expect(navigateServiceSpy.navegarParaRegistro).toHaveBeenCalled();
  });
});
