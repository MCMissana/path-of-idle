export function randomInt(max: number = 99999999) {
    return Math.floor(Math.random() * max);
}

export function randomIntInRange(min: number = 0,max: number = 99999999) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDecimalInRange(min: number = 0,max: number = 1) {
    return Number((Math.random() * (max - min) + min).toFixed(2))
}