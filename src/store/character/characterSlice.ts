import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { item, defaultItem } from '../../models/newItem'
import { equiptment  } from '../../models/equiptment'


export interface CharacterState {
  value: number,
  equipt: equiptment, 
  stats: {
    damage: number
  },
  maxWin: number
}

const initialState: CharacterState = {
  value: 0,
  equipt:{
    head: defaultItem("head"),
    body: defaultItem("body"),
    legs: defaultItem("legs"),
    weapon: defaultItem("weapon")
  },
  stats: {
    damage: 0
  },
  maxWin: 0
}

// const recalcStats = (newEquipt: equiptment) => {
//     let num = 0
//     Object.keys(newEquipt).forEach((slot) => {
//         num += newEquipt[slot]?.d ? newEquipt[slot]?.d : 0;
//       });
//     return {
//         damage: num
//     }
// }

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    equip: (state, action: PayloadAction<item>) => {
        let temp = JSON.parse(JSON.stringify(state.equipt))
        temp[action.payload.type] = action.payload
        // state.stats = recalcStats(temp);
        state.equipt = JSON.parse(JSON.stringify(temp))
    },
    setMaxWin: (state, action: PayloadAction<number>) => {
        state.maxWin = Math.max(state.maxWin, action.payload)
    },
    reset: (state) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { equip, increment, incrementByAmount, setMaxWin, reset } = characterSlice.actions

export default characterSlice.reducer