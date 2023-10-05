import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { FeedService } from 'src/app/feed/services/feed.service';
import { ErrorService } from 'src/app/services/error.service';
import { GerenciaEstadoService } from 'src/app/services/gerencia-estado.service';
import { environment } from 'src/environments/environment';

const URL = environment.api

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private gerenciaEstado: GerenciaEstadoService, private feedService: FeedService, private errorService: ErrorService, private http: HttpClient) { }

  getNotifications(){
    return new Observable<any[]>(observable=>{
      if(this.gerenciaEstado.allNotifications$.getValue().length){
        observable.next(this.gerenciaEstado.allNotifications$.getValue());
        observable.complete();
      } else{
        this.getAllNotifications().pipe(
          map((response: any) => response['data']),
          tap(response => this.gerenciaEstado.setAllNotifications(response)),
          catchError(async () => this.errorService.trazerErro())
        )
        .subscribe(response => {
          observable.next(response);
          observable.complete();
        })
      }
    });
  }

  getAllNotifications(){
    return this.http.get<Observable<any[]>>(`${URL}/get-notifications`)
  }
}
