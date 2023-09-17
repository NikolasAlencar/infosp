import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnviaMensagemService } from '../services/envia-mensagem.service';
import { NavigateService } from '../services/navigate.service';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from '../services/geolocation.service';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  latitude!: number;
  longitude!: number;
  zoom: number = 16;

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

  ngOnInit(): void {
    this.geoService.getUserLocation()
      .then(position => {
        this.latitude = position.latitude;
        this.longitude = position.longitude;
      })
      .catch(reason => this.enviaMensagem.sucesso(reason))

    setTimeout(() => {
      //this.geocodingService.geocodeLatLng({ lat: -23.703192171473923, lng: -46.785444724173935 }).then(retorno => console.log(retorno))

      //this.geocodingService.getLocation('Rua santa sofia').subscribe(value => console.log(value))
    }, 1000)
  }
}
