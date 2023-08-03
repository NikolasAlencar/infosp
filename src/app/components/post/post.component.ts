import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {

  @Input() posts: any;
  @Input() cachePosts: any;
  indexActivePost: number = 0;

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPost(index: number){
    this.indexActivePost = index;
    this.dialog.open(this.viewPost)
  }

  handleOptions(index?: number){
    this.cachePosts[index as number].postAberto = !this.cachePosts[index as number].postAberto;
  }
}
