import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {

  @Input() posts: any;
  @Input() cachePosts: any;

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPost(){
    this.dialog.open(this.viewPost)
  }

  handleOptions(index?: number, situation?: any){
    this.cachePosts[index as number].postAberto = !this.cachePosts[index as number].postAberto;
  }
}
