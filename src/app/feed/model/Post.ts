export interface Post {
  idPost: string,
  tipoPost: string,
  nomeUsuario: string,
  imgUsuario: string,
  imgPost: string,
  interacoes: number,
  comentarios: Comentario[]
  titulo: string,
  descricao: string,
  postAberto?: boolean
}

interface Comentario {
  imgUsuario: string,
  mensagemComentario: string,
  nomeUsuario: string
}
