import React from 'react'
import type { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import { recycleItem } from '../../store/inventory/inventorySlice'
import { increment } from '../../store/character/characterSlice'

export function Recycle() {
  const stats = useSelector((state: RootState) => state.character.stats)
  const equipt = useSelector((state: RootState) => state.character.equipt)
  const gold = useSelector((state: RootState) => state.character.value)
  const inv = useSelector((state: RootState) => state.inventory.inv)
  const dispatch = useDispatch()

  function deleteItem(e: any) {
    e.preventDefault();
    // get data from dragStartEvent
    const data = Number(e.dataTransfer.getData("id"));
    let resp = dispatch(recycleItem(data))
    dispatch(increment())
  }

  return (
    <>
        <div
            style={{ height: "10%", background: "#bbb" }}
            onDrop={(e) => deleteItem(e)}
            onDragOver={(e) => e.preventDefault()}
          >
            Trash
          </div>
    </>
  )
}