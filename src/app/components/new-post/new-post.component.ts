import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FeedService } from "src/app/feed/services/feed.service";
import { GerenciaEstadoService } from "src/app/services/gerencia-estado.service";
import { UserData } from "src/assets/model/UserData";
import { getIdUnico } from "src/assets/util/idUnico";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {

  uploadedFile = false;
  arquivo: any;
  userData: UserData | undefined;
  @Output() posted = new EventEmitter();

  constructor(private fb: FormBuilder, private gerenciaEstado: GerenciaEstadoService, private feedService: FeedService) { }

  ngOnInit(): void {
    this.gerenciaEstado.userData$.subscribe(userData => {
      this.userData = userData
    });
  }

  public newPostForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(7)]],
    imagem: ['', []],
    descricao: ['', [Validators.required, Validators.minLength(7)]]
  })

  postar(){
    const formData = new FormData();
    formData.append('arquivo', this.arquivo);
    formData.append('body', JSON.stringify(this.getPayload()))
    this.feedService.post(formData).subscribe({
      next: () => this.posted.emit(),
      error: (e) => console.log(e)
    })
  }

  getPayload(){
    const nomeImagem = getIdUnico();
    return {
      post: this.getPayloadPost(nomeImagem),
      titulo: this.newPostForm.value.titulo,
      descricao: this.newPostForm.value.descricao,
      nomeImagem
    }
  }

  getPayloadPost(imgPost: number){
    return {
      nomeUsuario: this.userData?.nomeUsuario,
      imgUsuario: this.userData?.imgUsuario,
      tipoPost: "",
      imgPost,
      interacoes: 0,
      idPost: getIdUnico(),
      postAberto: false,
      comentarios: [ ]
    }
  }

  onFileChange(event: any) {
    const arquivos = (event.target as HTMLInputElement).files;
    this.arquivo = arquivos![0];
    this.uploadedFile = true;
  }
}
