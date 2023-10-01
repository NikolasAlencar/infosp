import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FeedService } from "./services/feed.service";
import { Observable, catchError, map, tap } from "rxjs";
import { ErrorService } from "../services/error.service";
import { GerenciaEstadoService } from "../services/gerencia-estado.service";
import { UserData } from "src/assets/model/UserData";
import { environment } from "src/environments/environment";
import { NotificationService } from "../services/notification.service";
import { Post } from "./model/Post";
import { LoadingService } from "../services/loading.service";
import { UtilService } from "../services/util.service";
import { WebSocketService } from "../services/web-socket.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
  providers: [WebSocketService]
})
export class FeedComponent implements OnInit {

  cachePosts!: Post[];
  userData!: UserData
  urlImg = environment.urlImg;
  defaultImg = environment.defaultUrlImg;

  content = '';
  received: any;
  sent: any;

  constructor(private dialog: MatDialog,
    private feedService: FeedService,
    private errorService: ErrorService,
    private gerenciaEstado: GerenciaEstadoService,
    private notification: NotificationService,
    private loading: LoadingService,
    public util: UtilService) { }

  posts$: Observable<any> = this.feedService.getPosts().pipe(
    map((response: any) => response['data']),
    tap(response => this.cachePosts = response),
    catchError(async () => this.errorService.trazerErro())
  )

  ngOnInit(): void {
    this.gerenciaEstado.lastNotification$.subscribe(notificacao => this.notification.showNotification(notificacao));

    this.gerenciaEstado.userData$.subscribe(userData => {
      this.userData = userData
    });
  }

  @ViewChild('newPost', { static: true })
  newPost!: TemplateRef<any>

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  isOpenOptions = false;

  openNewPost(){
    this.dialog.open(this.newPost)
  }

  closeDialogs(cacheNewPost: any){
    this.dialog.closeAll();
    this.cachePosts.unshift(cacheNewPost.post);
    setTimeout(() => {
      this.gerenciaEstado.setCachePosts(this.cachePosts);
      this.loading.hideLoader();
    }, 2000)
  }

  openPost(){
    this.dialog.open(this.viewPost)
  }
}
