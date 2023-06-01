export const juntaNome = (nome: any, sobrenome: any) => {
    const nomeSeparado: any = [nome, sobrenome]
    const nomeInteiro: any = nomeSeparado.join(' ')
    return nomeInteiro
}

