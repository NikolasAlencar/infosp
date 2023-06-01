export const randomNum = (min: number, max: number) => {
    const number = Math.random() * (max - min) + min;
    return Math.trunc(number)
}