import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FeedService } from "./services/feed.service";
import { Observable, catchError, map } from "rxjs";
import { ErrorService } from "../services/error.service";
import { GerenciaEstadoService } from "../services/gerencia-estado.service";
import { UserData } from "src/assets/model/UserData";
import { environment } from "src/environments/environment";
import { NotificationService } from "../services/notification.service";
import { Post } from "./model/Post";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {

  cachePosts!: Post[];
  userData!: UserData
  urlImg = environment.urlImg;
  defaultImg = environment.defaultUrlImg;

  constructor(private dialog: MatDialog,
    private feedService: FeedService,
    private errorService: ErrorService,
    private gerenciaEstado: GerenciaEstadoService,
    private notification: NotificationService,
    private loading: LoadingService) {}

  posts$: Observable<any> = this.feedService.getPosts().pipe(
    map((response: any) => response['data']),
    catchError(async () => this.errorService.trazerErro())
  )

  ngOnInit(): void {
    this.posts$.subscribe(posts => {
      this.cachePosts = posts //remover após
      this.gerenciaEstado.setCachePosts(this.cachePosts);
    })

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
    this.notification.showNotification();
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
