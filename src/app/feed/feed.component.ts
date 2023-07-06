import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openPost()
  }

  @ViewChild('newPost', { static: true })
  newPost!: TemplateRef<any>

  @ViewChild('viewPost', { static: true })
  viewPost!: TemplateRef<any>

  isOpenOptions = false;

  openNewPost(){
    this.dialog.open(this.newPost)
  }

  openPost(){
    this.dialog.open(this.viewPost)
  }

  handleOptions(){
    this.isOpenOptions = !this.isOpenOptions;
  }
}
