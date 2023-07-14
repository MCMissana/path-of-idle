import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  stage: number,
  running: boolean,
  autoAscend: boolean
}

const initialState: GameState = {
  stage: 1,
  running: false,
  autoAscend: false
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.running = true
    },
    stopGame: (state) => {
        state.running = false
    },
    setStage: (state, action: PayloadAction<number>) => {
        state.running = false
        state.stage = action.payload
    },
    setAutoAscend: (state, action: PayloadAction<boolean>) => {
      state.autoAscend = action.payload
    },
    reset: (state) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { startGame, stopGame, setStage, reset, setAutoAscend } = gameSlice.actions

export default gameSlice.reducer