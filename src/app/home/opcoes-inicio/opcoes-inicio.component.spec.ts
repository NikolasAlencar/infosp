import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesInicioComponent } from './opcoes-inicio.component';

describe('OpcoesInicioComponent', () => {
  let component: OpcoesInicioComponent;
  let fixture: ComponentFixture<OpcoesInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcoesInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcoesInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
