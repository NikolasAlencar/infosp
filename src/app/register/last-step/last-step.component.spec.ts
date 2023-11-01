import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastStepComponent } from './last-step.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { EnviaMensagemService } from 'src/app/services/envia-mensagem.service';
import { ErrorService } from 'src/app/services/error.service';
import { AuthorizationService } from 'src/app/authorization/authorization.service';
import { GerenciaEstadoService } from 'src/app/services/gerencia-estado.service';
import { of, throwError } from 'rxjs';

describe('LastStepComponent', () => {
  let component: LastStepComponent;
  let fixture: ComponentFixture<LastStepComponent>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let navigateServiceSpy: jasmine.SpyObj<NavigateService>;
  let mensagemServiceSpy: jasmine.SpyObj<EnviaMensagemService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  let authServiceSpy: jasmine.SpyObj<AuthorizationService>;
  let gerenciaEstadoServiceSpy: jasmine.SpyObj<GerenciaEstadoService>;

  beforeEach(() => {
    const registerService = jasmine.createSpyObj('RegisterService', ['addUser', 'enviaEmailRegister']);
    const navigateService = jasmine.createSpyObj('NavigateService', ['navegarParaFeed']);
    const mensagemService = jasmine.createSpyObj('EnviaMensagemService', ['sucesso']);
    const errorService = jasmine.createSpyObj('ErrorService', ['trazerErro']);
    const authService = jasmine.createSpyObj('AuthorizationService', ['saveUserInfo']);
    const gerenciaEstadoService = jasmine.createSpyObj('GerenciaEstadoService', ['setUserData']);

    TestBed.configureTestingModule({
      declarations: [ LastStepComponent ],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['getCurrentNavigation']) },
        { provide: RegisterService, useValue: registerService },
        { provide: NavigateService, useValue: navigateService },
        { provide: EnviaMensagemService, useValue: mensagemService },
        { provide: ErrorService, useValue: errorService },
        { provide: AuthorizationService, useValue: authService },
        { provide: GerenciaEstadoService, useValue: gerenciaEstadoService }
      ]
    });

    fixture = TestBed.createComponent(LastStepComponent);
    component = fixture.componentInstance;

    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    navigateServiceSpy = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
    mensagemServiceSpy = TestBed.inject(EnviaMensagemService) as jasmine.SpyObj<EnviaMensagemService>;
    errorServiceSpy = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    authServiceSpy = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;
    gerenciaEstadoServiceSpy = TestBed.inject(GerenciaEstadoService) as jasmine.SpyObj<GerenciaEstadoService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call enviaEmailRegister when reiniciar is called', () => {
    component.user = { params: { get: () => JSON.stringify({ email: 'test@example.com' }) } } as any;
    registerServiceSpy.enviaEmailRegister.and.returnValue(of(null as any));

    component.reiniciar();

    expect(registerServiceSpy.enviaEmailRegister).toHaveBeenCalledWith('test@example.com', jasmine.any(Number));
  });
});
