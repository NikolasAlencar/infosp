export interface ConsultarAcao {
  nome: string;
  opcao: number;
  descricao: string;
  erro: string;
}

export interface ConsultarAcoes extends Array<ConsultarAcao> {}
