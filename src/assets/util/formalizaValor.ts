import { retiraEspeciais } from "./retiraEspeciais";

export const formalizaValor = (valor: string) =>{
  valor = retiraEspeciais(valor.toLocaleLowerCase().substring(valor.indexOf("/")))
  return valor
}
