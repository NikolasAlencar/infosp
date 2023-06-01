export const retiraEspeciais = (string: any) => {
    return string.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
}