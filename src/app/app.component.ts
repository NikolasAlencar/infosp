import { Component, OnInit } from "@angular/core";
import { ActivationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import { Header } from "./header/model/Header";
import { LoadingService } from "./services/loading.service";
import { WebSocketService } from "./services/web-socket.service";
import { GerenciaEstadoService } from "./services/gerencia-estado.service";
import { NotificationService } from "./services/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [WebSocketService]
})
export class AppComponent implements OnInit {
  title = "my-project.v2";

  header!: Header;

  constructor(public router: Router, private loadingService: LoadingService, private socket: WebSocketService, private gerenciaEstado: GerenciaEstadoService, private notification: NotificationService) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationStart)).subscribe((event: any) => {
        const temHeader = event?.snapshot?.routeConfig?.data?.header
        if(temHeader) this.header = temHeader
    })
  }

  loading = false;

  opened = false;

  openOrClose($event: boolean){
    this.opened = this.opened === $event ? !$event : $event
  }

  ngOnInit(): void {
    this.socket.setupSocketConnection();

    this.gerenciaEstado.lastNotification$.subscribe(notificacao => {
      this.notification.showNotification(notificacao)
    });

    this.loadingService.loading$.subscribe(hideOrShow => {
      this.loading = hideOrShow;
    })
  }
}
