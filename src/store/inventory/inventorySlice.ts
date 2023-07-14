import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateItem, item, generateInitItems } from '../../models/newItem'

export interface InventoryState {
  inv: item[], 
  drops: item[],
}

const initItems: Array<item> = generateInitItems()

const initialState: InventoryState = {
  inv: initItems,
  drops: []
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    recycleItem: (state, action: PayloadAction<number>) => {
        let tempInv = JSON.parse(JSON.stringify(state.inv));
        tempInv = tempInv.filter(function (i: item) {
            return i.id !== action.payload;
        });
        // TODO probably check if equipt and if do not delete do not incr
        state.inv = JSON.parse(JSON.stringify(tempInv))
    },
    generateDrop: (state, action: PayloadAction<number>) => {
        let genItem = generateItem(action.payload)
        let tempDrops = JSON.parse(JSON.stringify(state.drops))
        if(tempDrops.length > 20) tempDrops.shift()
        tempDrops = [...tempDrops, genItem]
        state.drops = JSON.parse(JSON.stringify(tempDrops))
    },
    moveToInv: (state, action: PayloadAction<item>) => {
          let tempDrops = JSON.parse(JSON.stringify(state.drops));
          tempDrops = tempDrops.filter(function (i: item) {
            if (i.id === action.payload.id) state.inv = [...state.inv, i];
            return i.id !== action.payload.id;
          });
          state.drops = JSON.parse(JSON.stringify(tempDrops))  
    },
    recycleDrops: (state) => {
        state.drops = initialState.drops
    },
    reset: (state) => {
      return {...initialState, inv: window.structuredClone(generateInitItems())}
    },
  },
})

// Action creators are generated for each case reducer function
export const { recycleItem, generateDrop, moveToInv, recycleDrops, reset } = inventorySlice.actions

export default inventorySlice.reducer