export interface Post {
  idPost: string,
  tipoPost: string,
  nomeUsuario: string,
  imgUsuario: string,
  imgPost: string,
  interacoes: number,
  comentarios: Comentario[]
}

interface Comentario {
  imgUsuario: string,
  mensagemComentario: string
}
