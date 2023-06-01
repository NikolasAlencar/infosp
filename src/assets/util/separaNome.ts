export const separaNome = (nome: any) => {
    let resto = nome.split(" ")
    let primeiroNome = resto[0]
    resto = resto.splice(1).join(" ")
    const nomeSeparado: any = {nome: primeiroNome, sobrenome: resto}
    return nomeSeparado
}

