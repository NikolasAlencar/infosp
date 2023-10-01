import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnviaMensagemService } from '../services/envia-mensagem.service';
import { NavigateService } from '../services/navigate.service';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from '../services/geolocation.service';
import { GeocodingService } from '../services/geocoding.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { GerenciaEstadoService } from '../services/gerencia-estado.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  latitude!: number;
  longitude!: number;
  origin!: google.maps.LatLngLiteral;
  destination!: google.maps.LatLngLiteral;
  timeOfTravel: any;
  distance?: string;
  duration?: string;
  zoom: number = 16;

  startOptions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  endOptions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  startFormControl: FormControl = new FormControl();
  endFormControl: FormControl = new FormControl();

  constructor(private navigate: NavigateService,
              private dialog: MatDialog,
              private geoService: GeolocationService,
              private enviaMensagem: EnviaMensagemService,
              private geocodingService: GeocodingService,
              private notificationService: NotificationService,
              private gerenciaEstado: GerenciaEstadoService) { }

  handleRoute() {
    if(this.isLogged()){
      const origin = this.getOriginOrDestination(this.startFormControl.value, this.startOptions.getValue());
      const destination = this.getOriginOrDestination(this.endFormControl.value, this.endOptions.getValue());
      if(origin.formatted_address && destination.formatted_address){
        this.setOriginLatLng(origin.geometry.location.lat(), origin.geometry.location.lng());
        this.setDestinationLatLng(destination.geometry.location.lat(), destination.geometry.location.lng());
        this.setMatrix();
      }
    } else{
      this.abrirOnboarding()
    }
  }

  getOriginOrDestination = (valueFormControl: any, valueOptions: any) => valueOptions.find((value: { formatted_address: any; }) => value.formatted_address === valueFormControl);

  @ViewChild('onboarding', { static: true })
  onboarding!: TemplateRef<any>

  abrirOnboarding() {
    this.dialog.open(this.onboarding)
  }

  isLogged(){
    return sessionStorage.getItem('TOKEN');
  }

  setOriginLatLng(lat: number, lng: number){
    this.origin = {lat, lng};
  }

  setDestinationLatLng(lat: number, lng: number){
    this.destination = {lat, lng};
  }

  setMatrix(){
    this.geocodingService.getDistanceMatrix({origin: this.origin, destination: this.destination})
      .subscribe(matrix => {
        this.duration = matrix.rows[0].elements[0].duration.text
        this.distance = matrix.rows[0].elements[0].distance.text
      })
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

  filterAutoComplete(formControl: FormControl, start?: boolean){
    formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valueChange => this.geocodingService.getGeocoding(valueChange))
      )
      .subscribe({
        next: (location: any) => start ? this.startOptions.next(location.results.splice(0, 4)) : this.endOptions.next(location.results.splice(0, 4)),
      });
  }

  ngOnInit(): void {
    this.geoService.getUserLocation()
      .then(position => {
        this.latitude = position.latitude;
        this.longitude = position.longitude;
      })
      .catch(reason => this.enviaMensagem.sucesso(reason))

    this.filterAutoComplete(this.endFormControl);
    this.filterAutoComplete(this.startFormControl, true);
  }
}
