import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Post } from "src/app/feed/model/Post";
import { FeedService } from "src/app/feed/services/feed.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {

  @Input() cachePosts!: Post[];
  indexActivePost: number = 0;

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  constructor(private dialog: MatDialog, private feedService: FeedService) {
  }

  ngOnInit(): void {
  }

  openPost(index: number){
    this.indexActivePost = index;
    this.dialog.open(this.viewPost)
  }

  removePost(post: Post){
    this.feedService.removePost(post).subscribe({
      next: () => {
        const INDEX_POST = this.cachePosts.findIndex((cachePost) => cachePost.idPost === post.idPost);
        this.cachePosts.splice(INDEX_POST, 1);
      },
      error: (e) => console.log(e)
    });
  }

  handleOptions(index?: number){
    this.cachePosts[index as number].postAberto = !this.cachePosts[index as number].postAberto;
  }
}
