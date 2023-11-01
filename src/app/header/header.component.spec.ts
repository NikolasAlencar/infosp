import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavigateService } from '../services/navigate.service';
import { EventEmitter } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigateServiceSpy: jasmine.SpyObj<NavigateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NavigateService', ['navegarParaHome', 'voltar']);

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{ provide: NavigateService, useValue: spy }]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    navigateServiceSpy = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openedOrClosed event when openAndClose is called', () => {
    const isOpened = true;
    spyOn(component.openedOrClosed, 'emit');
    component.openAndClose(isOpened);
    expect(component.openedOrClosed.emit).toHaveBeenCalledWith(isOpened);
  });

  it('should call navigateService.navegarParaHome when navegarHome is called', () => {
    component.navegarHome();
    expect(navigateServiceSpy.navegarParaHome).toHaveBeenCalled();
  });

  it('should call navigateService.voltar when voltar is called', () => {
    component.voltar();
    expect(navigateServiceSpy.voltar).toHaveBeenCalled();
  });
});
