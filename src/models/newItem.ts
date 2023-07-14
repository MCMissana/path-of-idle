import { randomInt, randomDecimalInRange, randomIntInRange } from "../helpers/randomInt"

const allTypes = ["head", "body", "legs", "weapon"];
type types = typeof allTypes[number] 

const allSlotsMods = ["flat-health"];
type allowedSlotsMods = typeof allSlotsMods[number] 

const allWeaponMods = ["percent-damage","flat-damage", "flat-attackTime", "flat-hitChance"];
type allowedWeaponMods = typeof allWeaponMods[number] 

const allArmourMods = ["flat-dodge", "flat-block","percent-dodge", "percent-block", "percent-health"];
type allowedArmourMods = typeof allArmourMods[number] 

type effect = {
	value: number,
    op: "additive" | "multiplicative",
    tier?: number
}

export interface mod {
  type: allowedSlotsMods | allowedArmourMods | allowedWeaponMods,
  id: number,
  effectStat: string,
  effect: effect
}

type effectConfig = {
	values: Array<number>,
    minValues: Array<number>,
    opperations: "additive" | "multiplicative"
}

interface modConfig {
    type: allowedSlotsMods | allowedArmourMods | allowedWeaponMods,
    effectStat: string,
    effect: effectConfig
  }

const masterList: Array<modConfig> = [
    {
        type: "flat-damage",
        effectStat: "damage",
        effect: {
            values: [10,20,30,40],
            minValues: [1,5,10,20],
            opperations: "additive"
        }
    },
    {
        type: "percent-damage",
        effectStat: "damage",
        effect: {
            values: [0.4,0.6,0.8,0.9],
            minValues: [0.2,0.2,0.3,0.4],
            opperations: "multiplicative"
        }
    },
    {
        type: "flat-health",
        effectStat: "health",
        effect: {
            values: [20,25,30,50],
            minValues: [10,10,15,20],
            opperations: "additive"
        }
    },
    {
        type: "percent-health",
        effectStat: "health",
        effect: {
            values: [0.2,0.4,0.5,0.6],
            minValues: [0.1,0.1,0.2,0.2],
            opperations: "multiplicative"
        }
    },
    {
        type: "flat-block",
        effectStat: "block",
        effect: {
            values: [0.1,0.15,0.2,0.3],
            minValues: [0.05,0.05,0.1,0.15],
            opperations: "additive"
        }
    },
    {
        type: "flat-dodge",
        effectStat: "dodge",
        effect: {
            values: [0.1,0.15,0.2,0.25],
            minValues: [0.05,0.1,0.1,0.1],
            opperations: "additive"
        }
    },
    {
        type: "percent-block",
        effectStat: "block",
        effect: {
            values: [0.2,0.3,0.4,0.5],
            minValues: [0.1,0.2,0.2,0.2],
            opperations: "multiplicative"
        }
    },
    {
        type: "percent-dodge",
        effectStat: "dodge",
        effect: {
            values: [0.2,0.3,0.4,0.5],
            minValues: [0.1,0.2,0.2,0.3],
            opperations: "multiplicative"
        }
    },
    {
        type: "flat-hitChance",
        effectStat: "hitChance",
        effect: {
            values: [0.1,0.15,0.2,0.3],
            minValues: [0.05,0.1,0.1,0.1],
            opperations: "additive"
        }
    },
    {
        type: "flat-attackTime",
        effectStat: "attackTime",
        effect: {
            values: [-0.1,-0.2,-0.3,-0.4],
            minValues: [-0.1,-0.2,-0.3,-0.4],
            opperations: "additive"
        }
    }
]

export type item = {
    id: number,
    name: string,
    type: types,
    modifiers: Array<mod>
}

export const getIndexForLayer = (l: number): number => {
    if(l > 50) return 3
    else if(l > 20) return 2
    else if(l > 10) return 1
    return 0
}

export const getNumberOfModsForLayer = (l: number): number => {
    if(l > 50) return 4
    else if(l > 20) return 3
    else if(l > 10) return 2
    return 1
}

const getGeneratedTier = (v: number, arr: Array<number>): number => {
    for(let t = 0; t < arr.length; t++){
        if(v < arr[t]) return t;
    }
    return 0
}

const generateMod = (slot: types, layer: number, specificMod: string = ""): mod => {
    
    let allowedMods: Array<string> = [...allSlotsMods]
    if(["weapon"].includes(slot)) allowedMods = [...allowedMods, ...allWeaponMods]
    if(["head","body","legs"].includes(slot)) allowedMods = [...allowedMods, ...allArmourMods]

    let modType = specificMod ? specificMod : allowedMods[randomInt(allowedMods.length)]
    let config = masterList.find((i) => i.type === modType)
    if(!config){
        throw new Error(`No config for for (${modType}) in masterList ${specificMod ? "specificMod" : ""}`)
    }
    
    let effectTier = randomInt(getIndexForLayer(layer) + 1)    

    //calc value
    let genValue: number;
    let genTier: number = 0
    if(config.effect.values[effectTier] < 1){
        genValue = randomDecimalInRange(config.effect.minValues[effectTier],config.effect.values[effectTier])
    } else{
        genValue = randomIntInRange(config.effect.minValues[effectTier],config.effect.values[effectTier])
    }
    genTier = getGeneratedTier(genValue, config.effect.values)

    if(genValue < config.effect.minValues[effectTier] || genValue > config.effect.values[effectTier]){
        throw Error("generateMod - generated Value is outside of allowed range")
    }

    return {
        type: config?.type || "flat-damage",
        id: randomInt(),
        effectStat: config.effectStat,
        effect: {
            op: config?.effect.opperations,
            value: genValue,
            tier: genTier
        }
    }
}

export function generateItem(itemLevel: number): item{

    let genSlot = allTypes[Math.floor(Math.random() * allTypes.length)];
    let id = randomInt(99999999)

    let modCount = randomInt(getNumberOfModsForLayer(itemLevel))
    let mods: Array<mod> = []

    for(let i = 0; i <= modCount; i++){
        if(genSlot === "weapon" && mods.length === 0){
            mods.push(generateMod(genSlot, itemLevel, "flat-damage"))
        }else{
            mods.push(generateMod(genSlot, itemLevel))
        }
        // here we can remove genMod.type from mods if we dont want dupes
    }
  
    return {
      id: id,
      name: genSlot,
      type: genSlot,
      modifiers: mods
    }
}

export function defaultItem(slot: types): item{

    let id = randomInt(99999999)
    let mods: Array<mod> = []

    return {
      id: id,
      name: `empty`,
      type: slot,
      modifiers: mods
    }
}

export function generateInitItems(itemLevel: number = 1): Array<item>{

    let starterItems: Array<item> = []

    for(let slot of allTypes){
        starterItems.push({
            id: randomInt(99999999),
            name: slot,
            type: slot,
            modifiers:[generateMod(slot,1)]
        })
    }
    
    return starterItems
}













// const myMod: mod ={
//   id: 1,
//   type: "damage",
//   effect: {
//   	value: 1
//     op: "additive"
//   }
  
// }
// const myMod2: mod ={
//   id: 2,
//   type: "health",
//   effect: {
//   	value: 1
//     op: "additive"
//   }
// }

// const myItem: item = {
//   id: 999,
//   name: "asf",
//   type: "head",
//   modifiers: [myMod]
// }
// const myItem2: item = {
//   id: 999,
//   name: "asf",
//   type: "head",
//   modifiers: [myMod2]
// }
// const myItem3: item = {
//   id: 999,
//   name: "asf",
//   type: "legs",
//   modifiers: [myMod]
// }

// let player = {
//   health: 100,
//   dmg: 1
// }

// const myItems: Array<item> = [myItem, myItem2,myItem3]

// const calcEffects = (arr: Array<mod>) => {
// 		let tempAdd = 0;
//     let tempMult = 1;
//     for(const m of arr){
//       //console.log(i)
//       if(m.effect.op === "additive") tempAdd += m.effect.value
//       else if (m.effect.op === "multiplicative") tempMult += m.effect.value
//     }
//     return (tempAdd * tempMult)
// }

// const getConfig = () => {
//   let dmg = 0
//   const allMods: Array<mod> = []
//   for(const i of myItems){
//     //console.log(i)
//     for(const m of i.modifiers){
//     	allMods.push(m)
//   	}
//   }
  
//   // damage filter
//   let dmgMods = allMods.filter((i) => i.type === "damage")
//   player.dmg += calcEffects(dmgMods)
  
//   // health filter
//   let healthMods = allMods.filter((i) => i.type === "health")
//   player.health += calcEffects(healthMods)
  
  
  
// 	console.log(allMods[0])
//   console.log(player)
// }
// // getConfig()


//   // const getPlayer = () => {
//   //       return {
//   //           health: 100,
//   //           damage: Math.max(stats?.damage,1),
//   //           attackTime: 2,
//   //           hitChance: 0.8,
//   //           dodge: 0.1,
//   //           block: 0.1
//   //       }
//   //   }