export const formalizaCpf = (string: any) => {
    return string.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");
}