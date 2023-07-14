import { equiptment } from "../models/equiptment";
import { gameCharacter, getDefaultCharacter } from "../models/gameCharacter";
import { item, mod } from "../models/newItem";
import { applyGearToCharacter } from "./applyGearToCharacter";
import { getArrayOfEquipt } from "./getArrayOfEquipt";

export function gearCompare(currentEquipt: equiptment, char: gameCharacter = getDefaultCharacter(), itemToEquipt: item):object {

    let equpitToArray = getArrayOfEquipt(currentEquipt)

    let current = window.structuredClone(applyGearToCharacter(equpitToArray,char))
    let compareEquipt = equpitToArray.filter((i: item) => i.type !== itemToEquipt.type)
    
    compareEquipt.push(itemToEquipt)
    let compare = window.structuredClone(applyGearToCharacter(compareEquipt,char))

    const diffChar = getDefaultCharacter();
    for(let key in diffChar){
         // if(key === "health")console.log(key,"compare " +compare[key], "current " + current[key],compare[key] - current[key])
        diffChar[key] = compare[key] - current[key]
    }

    let returnChar: object = diffChar;
    for(let key in returnChar){
        if(returnChar[key] === 0) delete returnChar[key];
    }
    

    return returnChar;

}