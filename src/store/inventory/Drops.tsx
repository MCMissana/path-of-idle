import React from 'react'
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { moveToInv, recycleDrops } from '../inventory/inventorySlice'
import { Button, Grid, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { incrementByAmount } from '../character/characterSlice';
import { ItemDisplay } from '../../components/items/itemDisplay'
import { ModDisplay } from '../../components/items/modDisplay'

export function Drops() {
  const drops = useSelector((state: RootState) => state.inventory.drops)
  const characterEquipt = useSelector((state: RootState) => state.character.equipt)
  const dispatch = useDispatch()

  function clearDrops() {
    dispatch(incrementByAmount(drops.length))
    dispatch(recycleDrops())
  }

  return (
    <>
    
        <div style={{ height: "100%" }}>
          <Grid container>
            <Grid item xs={9} style={{ borderBottom: "solid 1px" }}>
              <h5>Drops</h5>
            </Grid>
            <Grid item xs={3} style={{ borderBottom: "solid 1px" }}>
              <Button variant="outlined" startIcon={<DeleteIcon />} disabled={drops.length < 1} onClick={() => clearDrops()}/>
            </Grid>
            {drops.map((item) => {
              return (
                <Tooltip key={`dropDisplay-${item.id}`} title={<ModDisplay mods={item.modifiers}/>}>
                  <Grid
                    item
                    xs={2}
                    style={{
                      margin: "2px",
                      aspectRatio: "1 / 1",
                      border: `solid 1px ${
                        characterEquipt[item.slot]?.id === item.id ? "#000" : "#dddddd"
                      }`
                    }}
                    onClick={() => dispatch(moveToInv(item))}
                  >
                    <ItemDisplay item={item}/>
                  </Grid>
                </Tooltip>
              );
            })}
          </Grid>
        </div>
        
      </>
  )
}