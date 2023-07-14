import React from 'react'
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { reset as resetChar } from '../store/character/characterSlice'
import { reset as resetGame } from '../store/game/gameSlice'
import { reset as resetInv } from '../store/inventory/inventorySlice'


export function ResetAll(props) {
  const dispatch = useDispatch()

  function handleReset() {
    dispatch(resetChar())
    dispatch(resetInv())
    dispatch(resetGame())
    console.log("game reset")
    }

  return (
    <Button onClick={() => handleReset()} {...props}>Reset Game</Button>
  )
}