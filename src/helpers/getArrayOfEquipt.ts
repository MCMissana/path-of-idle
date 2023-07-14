import { equiptment } from "../models/equiptment";
import { item } from "../models/newItem";

export function getArrayOfEquipt(arr: equiptment) {

    const arrOfEquipt: Array<item> = []

    for(let key in arr){
        arrOfEquipt.push(arr[key])
    }


    return arrOfEquipt;
}