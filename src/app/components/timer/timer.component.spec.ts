import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ]
    });

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  it('deve calcular corretamente as coordenadas para o timer', () => {
    component.svgSize = 100;  // Defina o tamanho do svg conforme necessário
    component.circuloTimerStrokeWidth = 2;  // Defina a largura do traço conforme necessário

    // Chame a função renderizarTimer
    component.renderizarTimer();

    // Verifique se as coordenadas foram calculadas corretamente
    expect(component.coordenadas.length).toBe(361);  // Espera-se que haja 361 coordenadas (1 para cada grau de 0 a 360)

    // Verifique se o círculo do timer foi inicializado como uma string vazia
    expect(component.circuloTimerCoordenadas).toBe('');
  });
});
