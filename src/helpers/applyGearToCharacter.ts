import { gameCharacter, getDefaultCharacter } from "../models/gameCharacter";
import { item, mod } from "../models/newItem";

const calcEffects = (arr: Array<mod>) => {
    let tempAdd = 0;
    let tempMult = 1;
    for(const m of arr){
        if(m.effect.op === "additive") tempAdd += m.effect.value
        else if (m.effect.op === "multiplicative") tempMult += m.effect.value
    }
    return (tempAdd * tempMult)
}

export function applyGearToCharacter(equipt: Array<item>, char: gameCharacter = getDefaultCharacter()) {
    let temp = window.structuredClone(char);

    const allMods: Array<mod> = []
    for(const i of equipt){
        for(const m of i.modifiers){
            allMods.push(m)
        }
    }

    // damage filter
    let dmgMods = allMods.filter((i) => i.effectStat === "damage")
    temp.damage += calcEffects(dmgMods)
    temp.damage = Number(temp.damage.toFixed(2))

    // health filter
    let healthMods = allMods.filter((i) => i.effectStat === "health")
    temp.health += calcEffects(healthMods)
    temp.health = Number(temp.health.toFixed(2))

    // dodge filter
    let dodgeMods = allMods.filter((i) => i.effectStat === "dodge")
    temp.dodge += calcEffects(dodgeMods)
    temp.dodge = Number(temp.dodge.toFixed(2))

    // block filter
    let blockMods = allMods.filter((i) => i.effectStat === "block")
    temp.block += calcEffects(blockMods)
    temp.block = Number(temp.block.toFixed(2))

    // hit chance filter
    let hitChanceMods = allMods.filter((i) => i.effectStat === "hitChance")
    temp.hitChance += calcEffects(hitChanceMods)
    temp.hitChance = Number(temp.hitChance.toFixed(2))

    // hit chance filter
    let attackTimeMods = allMods.filter((i) => i.effectStat === "attackTime")
    temp.attackTime += calcEffects(attackTimeMods)
    temp.attackTime = Number(temp.attackTime.toFixed(2))

    return temp;
}