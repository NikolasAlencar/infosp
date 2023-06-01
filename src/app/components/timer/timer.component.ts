import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"]
})
export class TimerComponent implements OnChanges, OnInit {
  @Input() tempoSegundos: number = 30;
  @Input() svgSize: number = 80;
  @Input() circuloFundoStroke: string = "#ccc";
  @Input() circuloFundoStrokeWidth: number = 1;
  @Input() circuloTimerStroke: string = "#3f51b5";
  @Input() circuloTimerStrokeWidth: number = 4;
  @Input() iniciaAuto!: boolean;
  @Output() acabou = new EventEmitter();

  coordenadas: Array<string> = [];
  circuloFundoCoordenadas: string = "";
  circuloTimerCoordenadas: string = "";

  _dataInicial: number = new Date().getTime();
  _segundosPassados: number = 0;

  constructor() {
    this.renderizarTimer();
  }

  ngOnInit(): void {
    if (this.iniciaAuto) this.iniciarContagem();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["svgSize"] || changes["tempo"]) {
      this.renderizarTimer();
    }
  }

  renderizarTimer() {
    const xyCentroTimer = this.svgSize / 2;
    const raio = this.svgSize / 2 - this.circuloTimerStrokeWidth * 2;

    const { x: x0, y: y0 } = this.calculaCoordenadas(0, raio, xyCentroTimer);

    this.coordenadas = [`M ${x0} ${y0}`];

    for (let grau = 1; grau <= 360; grau++) {
      const { x, y } = this.calculaCoordenadas(grau, raio, xyCentroTimer);

      this.coordenadas.push(`L ${x} ${y}`);
    }

    this.circuloFundoCoordenadas = this.coordenadas.join(" ");
    this.circuloTimerCoordenadas = "";
  }

  iniciarContagem() {
    this._dataInicial = new Date().getTime();
    this._segundosPassados = 0;

    this.processarContagemRegressiva();
  }

  processarContagemRegressiva() {
    // Porcentagem do tempo que passou
    const porcentagem = this._segundosPassados / this.tempoSegundos;

    this._segundosPassados = (new Date().getTime() - this._dataInicial) / 1000;

    const novasCoordenadas = this.coordenadas.slice(0, porcentagem * this.coordenadas.length).join(" ");

    this.circuloTimerCoordenadas = novasCoordenadas;

    if (this._segundosPassados > this.tempoSegundos) {
      this.circuloTimerCoordenadas = this.coordenadas.join(" ");

      this.acabou.emit({ acabou: true });

      return;
    }

    setTimeout(this.processarContagemRegressiva.bind(this), 250);
  }

  calculaCoordenadas(graus: number, raio: number, xyCentroCirculo: number): { x: number; y: number } {
    const radiano = graus * (Math.PI / 180);

    return {
      x: xyCentroCirculo + Math.sin(radiano) * raio,
      y: xyCentroCirculo - Math.cos(radiano) * raio
    };
  }
}
