import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FeedService } from "src/app/feed/services/feed.service";
import { GerenciaEstadoService } from "src/app/services/gerencia-estado.service";
import { LoadingService } from "src/app/services/loading.service";
import { UtilService } from "src/app/services/util.service";
import { UserData } from "src/assets/model/UserData";
import { getIdUnico } from "src/assets/util/idUnico";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {

  uploadedFile = false;
  arquivo: any;
  userData: UserData | undefined;
  urlImg = environment.urlImg;
  cacheNewPost: any;
  defaultImg = environment.defaultUrlImg;
  tiposPost = ['Alagamento', 'Desastre', 'Acidente', 'Transito', 'Paralisação']
  @Output() posted = new EventEmitter();

  constructor(private fb: FormBuilder,
    private gerenciaEstado: GerenciaEstadoService,
    private feedService: FeedService,
    private loading:LoadingService,
    public util: UtilService) { }

  ngOnInit(): void {
    this.gerenciaEstado.userData$.subscribe(userData => this.userData = userData);
  }

  public newPostForm = this.fb.group({
    titulo: [''],
    imagem: ['', []],
    descricao: ['', [Validators.required, Validators.minLength(7)]],
    tipoPost: ['', [Validators.required]]
  })

  postar(){
    this.loading.showLoader();
    const formData = new FormData();
    this.cacheNewPost = this.getPayload();
    formData.append('arquivo', this.arquivo);
    formData.append('body', JSON.stringify(this.cacheNewPost))
    this.feedService.post(formData).subscribe({
      next: () => {
        this.posted.emit(this.cacheNewPost);
        this.gerenciaEstado.setCacheNotification(this.cacheNewPost);
      },
      error: (e) => this.loading.hideLoader()
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
      titulo: this.newPostForm.value.titulo,
      descricao: this.newPostForm.value.descricao,
      nomeUsuario: this.userData?.nomeUsuario,
      imgUsuario: this.userData?.imgUsuario,
      tipoPost: this.newPostForm.value.tipoPost,
      imgPost,
      dataPost: new Date().toLocaleDateString(),
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
