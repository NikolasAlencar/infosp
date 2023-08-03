import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.scss"]
})
export class ViewPostComponent implements OnInit {

  @Input() posts: any;
  @Input() indexActivePost!: number;

  constructor() {
  }

  ngOnInit(): void {
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
