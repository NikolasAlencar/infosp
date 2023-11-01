import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHomeComponent } from './new-home.component';
import { NavigateService } from '../services/navigate.service';

describe('NewHomeComponent', () => {
  let component: NewHomeComponent;
  let fixture: ComponentFixture<NewHomeComponent>;
  let navigateServiceSpy: jasmine.SpyObj<NavigateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NavigateService', ['navegarParaRegistro', 'navegarParaFeed', 'navegarParaLogin']);

    TestBed.configureTestingModule({
      declarations: [ NewHomeComponent ],
      providers: [{ provide: NavigateService, useValue: spy }]
    });

    fixture = TestBed.createComponent(NewHomeComponent);
    component = fixture.componentInstance;
    navigateServiceSpy = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate.navegarParaRegistro() when registrar() is called', () => {
    component.registrar();
    expect(navigateServiceSpy.navegarParaRegistro).toHaveBeenCalled();
  });

  it('should call navigate.navegarParaFeed() if user is logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('TOKEN');

    component.navegar();

    expect(navigateServiceSpy.navegarParaFeed).toHaveBeenCalled();
    expect(navigateServiceSpy.navegarParaLogin).not.toHaveBeenCalled();
  });

  it('should call navigate.navegarParaLogin() if user is not logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    component.navegar();

    expect(navigateServiceSpy.navegarParaLogin).toHaveBeenCalled();
    expect(navigateServiceSpy.navegarParaFeed).not.toHaveBeenCalled();
  });
});
