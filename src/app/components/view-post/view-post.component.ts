import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "src/app/feed/model/Post";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.scss"]
})
export class ViewPostComponent implements OnInit {

  @Input() posts: any;
  @Input() indexActivePost!: number;
  @Output() removePostEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  removePost(post: Post){
    this.removePostEmitter.emit(post);
  }

  handleOptions(){
    this.posts[this.indexActivePost].postAberto = !this.posts[this.indexActivePost].postAberto;
  }

  changeActiveIndex(number: number){
    this.indexActivePost = this.indexActivePost + number;
  }

  verificaMaior(){
    return this.indexActivePost + 1 >= this.posts.length;
  }

  verificaMenor(){
    return this.indexActivePost - 1 < 0;
  }
}
