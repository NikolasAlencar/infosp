import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FeedService } from "./services/feed.service";
import { Observable, catchError, map } from "rxjs";
import { ErrorService } from "../services/error.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {

  cachePosts: any;

  constructor(private dialog: MatDialog, private feedService: FeedService, private errorService: ErrorService) {}

  posts$: Observable<any> = this.feedService.getPosts().pipe(
    map((response: any) => response['data']),
    catchError(async () => this.errorService.trazerErro())
  )

  ngOnInit(): void {
    this.posts$.subscribe(posts => {
      this.cachePosts = posts
    })
  }

  @ViewChild('newPost', { static: true })
  newPost!: TemplateRef<any>

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  isOpenOptions = false;

  openNewPost(){
    this.dialog.open(this.newPost)
  }

  closeDialogs(){
    this.dialog.closeAll()
  }

  openPost(){
    this.dialog.open(this.viewPost)
  }
}
