import React, { Suspense, useEffect } from 'react'
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { equip } from '../character/characterSlice'
import { Grid, Tooltip } from '@mui/material'
import { item } from '../../models/newItem'
import { ItemDisplay } from '../../components/items/itemDisplay'
import { ModDisplay } from '../../components/items/modDisplay'
import { gearCompare } from '../../helpers/gearCompare'
const DiffDisplay  = React.lazy(() => import('../../components/items/diffDisplay'));



export function Inventory() {
  const inv = useSelector((state: RootState) => state.inventory.inv)
  const characterEquipt = useSelector((state: RootState) => state.character.equipt)
  const running = useSelector((state: RootState) => state.game.running)
  const dispatch = useDispatch()

  const toolTipDps = (i: item) => {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <ModDisplay mods={i.modifiers}/>
          </Grid>
          <Grid item xs={12}>
            <hr/>
          </Grid>
          <Suspense fallback={<div>Loading...</div>}>
            <Grid item xs={12}>
              <DiffDisplay characterEquipt={characterEquipt} itemToCompare={i}/>
            </Grid>
          </Suspense>
        </Grid>
      </>
    )
  }

  const newItemDisplay = (i: item) => {
    return(
      <Tooltip key={`invDisplay-${i.id}`} title={toolTipDps(i)}>
        <Grid 
          item 
          xs={2}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("id", String(i.id));
          }}
          onClick={() => {
            if(!running) dispatch(equip(i))
          }}
          style={{
            margin: "2px",
            width: "20%",
            aspectRatio: "1 / 1",
            border: `solid 1px ${
              characterEquipt[i.type]?.id === i.id ? "#000" : "#dddddd"
            }`,
          }}>
            <ItemDisplay item={i}/>
        </Grid>
      </Tooltip>
    )
  }

  return (
    <>
        <div style={{ height: "100%", }}>
          <Grid container>
            <Grid item xs={12} style={{borderBottom: "solid"}}>
              <h5>Inventory</h5>
              {/* <span>{currency}</span> */}
            </Grid>
            {inv.map((item) => {
              if(characterEquipt[item.type]?.id === item.id) return;
              return newItemDisplay(item)
            })}
          </Grid>
        </div>
      </>
  )
}