import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "src/app/feed/model/Post";
import { FeedService } from "src/app/feed/services/feed.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.scss"]
})
export class ViewPostComponent implements OnInit {

  @Input() posts: any;
  @Input() indexActivePost!: number;
  @Output() removePostEmitter = new EventEmitter();
  @Output() addCommentEmitter = new EventEmitter();

  constructor(public util: UtilService, private feedService: FeedService) {
  }

  ngOnInit(): void {
  }

  removePost(post: Post){
    this.removePostEmitter.emit(post);
  }

  addComment(post: Post, newComment: string){
    this.addCommentEmitter.emit({post, newComment});
  }

  delComment(post: Post, delComment: any){
    const indexComment = post.comentarios.findIndex(comentario => delComment.idComentario === comentario.idComentario);
    post.comentarios.splice(indexComment, 1);
    this.feedService.delComment(post).subscribe(response => console.log(response));
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
