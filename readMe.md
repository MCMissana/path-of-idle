
Current
```
type allowedSlots = "head" | "body" | "legs"

export type item = {
    id: number,
    name: string,
    slot: allowedSlots,
    d: number
}


  const getPlayer = () => {
        return {
            health: 100,
            damage: Math.max(stats?.damage,1),
            attackTime: 2,
            hitChance: 0.8,
            dodge: 0.1,
            block: 0.1
        }
    }
```

New
```
type allowedSlots = "head" | "body" | "legs"
type allowedSlotsMods = "health"
type allowedWeaponMods = "damage" | "attackTime" | "hitChance"
type allowedArmourMods = "dodge" | "block"



export type item = {
    id: number,
    name: string,
    slot: allowedSlots,
    stats: weaponStats | armourStats
}


  const getPlayer = () => {
        return {
            health: 100,
            damage: Math.max(stats?.damage,1),
            attackTime: 2,
            hitChance: 0.8,
            dodge: 0.1,
            block: 0.1
        }
    }
```