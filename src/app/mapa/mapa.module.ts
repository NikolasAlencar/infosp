import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MapaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    SharedModule,
    MatIconModule,
    MapaRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApPbBd0wDft1g6AWSRKPNFyrxtEcunhL0'
    }),
  ]
})
export class MapaModule { }
