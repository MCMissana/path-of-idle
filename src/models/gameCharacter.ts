export interface gameCharacter {
    health: number,
    damage: number,
    attackTime: number,
    hitChance: number,
    dodge: number,
    block: number
}

export function getDefaultCharacter(): gameCharacter {
    return {
        health: 50,
        damage: 1,
        attackTime: 2,
        hitChance: 0.8,
        dodge: 0.1,
        block: 0.1
    }
}