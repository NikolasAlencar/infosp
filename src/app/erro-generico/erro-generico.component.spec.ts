import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErroGenericoComponent } from './erro-generico.component';
import { NavigateService } from '../services/navigate.service';

describe('ErroGenericoComponent', () => {
  let component: ErroGenericoComponent;
  let fixture: ComponentFixture<ErroGenericoComponent>;
  let navigateServiceSpy: jasmine.SpyObj<NavigateService>;

  beforeEach(() => {
    const navigateServiceSpyObj = jasmine.createSpyObj('NavigateService', ['navegarParaLogin']);

    TestBed.configureTestingModule({
      declarations: [ErroGenericoComponent],
      providers: [{ provide: NavigateService, useValue: navigateServiceSpyObj }],
    });

    fixture = TestBed.createComponent(ErroGenericoComponent);
    component = fixture.componentInstance;
    navigateServiceSpy = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page', () => {
    component.voltar();
    expect(navigateServiceSpy.navegarParaLogin).toHaveBeenCalled();
  });
});
