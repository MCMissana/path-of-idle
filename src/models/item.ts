import { randomInt } from "../helpers/randomInt"

const allowedSlotsArr: allowedSlots[] = ["head", "body", "legs"]

type allowedSlots = "head" | "body" | "legs"

export type item = {
    id: number,
    name: string,
    slot: allowedSlots,
    d: number
}

export function defaultItem(slot: allowedSlots): item{
  return {
    id: allowedSlotsArr.indexOf(slot),
    name: "empty",
    slot: slot,
    d: 0
  }
}

export function generateItem(itemLevel: number): item{

  let genSlot = allowedSlotsArr[Math.floor(Math.random() * allowedSlotsArr.length)];
  let id = randomInt(99999999)
  let damage = randomInt(itemLevel)

  return {
    id: id,
    name: genSlot,
    slot: genSlot,
    d: damage
  }
}