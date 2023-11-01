import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { EnviaEmailService } from 'src/app/services/envia-email.service';
import { bodyReq } from 'src/assets/util/bodyReq';
import { environment } from 'src/environments/environment';
import { OptionsRegister } from '../model/OptionRegister';

const { headers, body } = bodyReq;

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService, EnviaEmailService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve options from the API via POST', () => {
    const option = 'someOption';
    const mockOptions: OptionsRegister = [
      {
          "name": "nome",
          "placeholder": "Digite seu nome completo",
          "desc": "Preencha seu nome"
      },
      {
          "name": "usuario",
          "placeholder": "Digite seu usuário",
          "desc": "Preencha seu usuário"
      },
      {
          "name": "email",
          "placeholder": "Digite seu email",
          "desc": "Preencha seu email"
      },
      {
          "name": "senha",
          "placeholder": "Digite sua senha",
          "desc": "Preencha sua senha"
      }
  ]

    service.getOptions(option).subscribe((options: OptionsRegister) => {
      expect(options).toEqual(mockOptions);
    });

    const req = httpMock.expectOne(`${environment.api}/obter/options/${option}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockOptions);
  });

  it('should retrieve user by name from the API via POST', () => {
    const name = 'someName';
    const mockUser = {
      "senha": "12345678",
      "nomeUsuario": "Nikolas Alencar",
      "imgUsuario": 8699231289,
      "usuario": "nikolau",
      "email": "nikolasalencarrs73@gmail.com"
  }

    service.getUser(name).subscribe((user: any) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.api}/obter/user/nome`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
