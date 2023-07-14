import React, { useState } from 'react'
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Tab, Tabs, Typography } from '@mui/material'
import { ResetAll } from '../../components/ResetAll'
import { item, mod } from '../../models/newItem'
import { getArrayOfEquipt } from '../../helpers/getArrayOfEquipt'
import { applyGearToCharacter } from '../../helpers/applyGearToCharacter'

export function Character() {
  const equipt = useSelector((state: RootState) => state.character.equipt)
  const gold = useSelector((state: RootState) => state.character.value)
  const dispatch = useDispatch()

  const [currentTab, setCurrentTab] = useState(0)

  const gearTab = () => {
    return(
        <Grid container style={{flexGrow: 1}}>
          {Object.keys(equipt).map((slots: any) => {
            return (
              <Grid
                item
                xs={6}
                key={`charDisplay-${slots}-${
                    equipt[slots] ? equipt[slots].id : "empty"
                }`}
              >
                <Typography>{equipt[slots] ? equipt[slots].name : "empty"}</Typography>
                {equipt[slots].modifiers.map((m: mod) => {
                  return(<Typography key={`charDisplay-${slots}-${m.id}`} style={{fontSize: "12px"}}>T{m.effect.tier} {m.type} - {m.effect.value}</Typography>)
                })}
              </Grid>
            );
          })}
          <Grid item xs={12} style={{ alignSelf: "flex-end"}}>
            <ResetAll variant={"outlined"}  style={{marginBottom: "1rem"}}/>
          </Grid>
        </Grid>
    )
  }

  const statsTab = () => {

    const arrOfEquipt: Array<item> = getArrayOfEquipt(equipt)
    const player = window.structuredClone(applyGearToCharacter(arrOfEquipt))

    return(
      <>
        <Grid container>
          <Grid item xs={12}>
            <div>
              <p>Health: {player.health}</p>
              <p>Damage: {player.damage}</p>
              <p>Attack Time: {player.attackTime}</p>
              <p>Hit Chance: {player.hitChance}</p>
              <p>Dodge: {player.dodge}</p>
              <p>Block: {player.block}</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p>Currency</p>
            <p>Gold: {gold}</p>
          </Grid>
        </Grid>
      </>
    )
  }





  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <Tabs value={currentTab} onChange={(e,v) => setCurrentTab(v)} aria-label="basic tabs example">
        <Tab label="Item One"/>
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      {currentTab === 0 && gearTab()}
      {currentTab === 1 && statsTab()}
    </div>
  )
}