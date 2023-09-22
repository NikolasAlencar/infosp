import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnviaMensagemService } from '../services/envia-mensagem.service';
import { NavigateService } from '../services/navigate.service';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from '../services/geolocation.service';
import { GeocodingService } from '../services/geocoding.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  latitude!: number;
  longitude!: number;
  zoom: number = 16;

  startOptions: Subject<any[]> = new Subject<any[]>();
  endOptions: Subject<any[]> = new Subject<any[]>();

  startFormControl: FormControl = new FormControl();
  endFormControl: FormControl = new FormControl();

  constructor(private mensagemService: EnviaMensagemService,
              private navigate: NavigateService,
              private dialog: MatDialog,
              private geoService: GeolocationService,
              private enviaMensagem: EnviaMensagemService,
              private geocodingService: GeocodingService) { }

  favoritar() {
    this.isLogged() ? this.mensagemService.sucesso(`A rota foi favoritada com sucesso!`) : this.abrirOnboarding();
  }

  @ViewChild('onboarding', { static: true })
  onboarding!: TemplateRef<any>

  abrirOnboarding() {
    this.dialog.open(this.onboarding)
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
  }

  fecharOnboarding(){
    this.dialog.closeAll();
  }

  registrar() {
    this.navigate.navegarParaRegistro();
  }

  voltarInicio(){
    this.navigate.navegarParaInicio();
  }

  setAutoComplete(formControl: FormControl, startOptions?: boolean){
    formControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(valueChange => this.geocodingService.getGeocoding(valueChange))
    )
    .subscribe((location: any) => startOptions ? this.startOptions.next(location.results.splice(0, 4)) : this.endOptions.next(location.results.splice(0, 4)));
  }

  ngOnInit(): void {
    this.geoService.getUserLocation()
      .then(position => {
        this.latitude = position.latitude;
        this.longitude = position.longitude;
      })
      .catch(reason => this.enviaMensagem.sucesso(reason))

    this.setAutoComplete(this.startFormControl, true);
    this.setAutoComplete(this.endFormControl);
  }
}
