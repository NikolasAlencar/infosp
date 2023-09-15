import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Post } from "src/app/feed/model/Post";
import { FeedService } from "src/app/feed/services/feed.service";
import { GerenciaEstadoService } from "src/app/services/gerencia-estado.service";
import { UtilService } from "src/app/services/util.service";
import { UserData } from "src/assets/model/UserData";
import { getIdUnico } from "src/assets/util/idUnico";
import { environment } from "src/environments/environment";

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

  userData!: UserData;
  defaultImg = environment.defaultUrlImg;
  urlImg = environment.urlImg;

  constructor(private dialog: MatDialog,
    private feedService: FeedService,
    private gerenciaEstado: GerenciaEstadoService,
    public util: UtilService) {
  }

  ngOnInit(): void {
    this.gerenciaEstado.userData$.subscribe(userData => this.userData = userData)
  }

  openPost(index: number){
    this.indexActivePost = index;
    this.dialog.open(this.viewPost)
  }

  addComment(post: any, newComment: string){
    if(newComment === 'child'){
      post.post.comentarios.push(this.getBodyComment(post.newComment));
      post = post.post
    } else {
      post.comentarios.push(this.getBodyComment(newComment));
    }
    this.feedService.addComment(post).subscribe({
      next: () => {
        console.log('Comentário adicionado com sucesso!')
      },
      error: (e) => post.pop()
    })
  }

  delComment(post: Post, delComment: any){
    const indexComment = post.comentarios.findIndex(comentario => delComment.idComentario === comentario.idComentario);
    post.comentarios.splice(indexComment, 1);
    this.feedService.delComment(post).subscribe(response => console.log(response));
  }

  getBodyComment(newComment: string){
    return {
      nomeUsuario: this.userData.nomeUsuario,
      imgUsuario: this.userData.imgUsuario || this.defaultImg,
      mensagemComentario: newComment,
      idComentario: getIdUnico()
    }
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
