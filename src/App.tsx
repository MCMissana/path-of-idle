import "./styles.css";
import { useEffect, useState } from "react";
import { Main } from "./components/runner/main"
import { Inventory } from "./store/inventory/Inventory";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Counter } from "./store/counter/Counter";
import { Character } from "./store/character/Character";
import { Recycle } from "./components/recycle";
import { generateDrop } from "./store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Drops } from "./store/inventory/Drops";
import { RootState } from "./store/store";
import { setAutoAscend, setStage } from "./store/game/gameSlice";

import {generateItem, getIndexForLayer, getNumberOfModsForLayer} from "./models/newItem";


export default function App() {

  const dispatch = useDispatch()
  const stage = useSelector((state: RootState) => state.game.stage)
  const autoAscend = useSelector((state: RootState) => state.game.autoAscend)
  const maxWin = useSelector((state: RootState) => state.character.maxWin)
  const [layerInfo, setLayerInfo] = useState([getNumberOfModsForLayer(stage), getIndexForLayer(stage)])

  // end init

  const drop = () => {
    dispatch(generateDrop(stage))
  };
  

  const getStages = () => {
    let content = [];
    for(let i = 1; i <= maxWin+1; i++){
        content.push(<MenuItem value={i} key={`layer-select-${i}`}>{i}</MenuItem>)
    }
    return content;
  }

  useEffect(() => {
    setLayerInfo([getNumberOfModsForLayer(stage), getIndexForLayer(stage)])
  }, [stage])

  const navDisplay = () => {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <FormControl style={{margin: "5%"}}>
            <InputLabel id="demo-simple-select-label">Layer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stage}
              label="Layer"
              onChange={(e) => dispatch(setStage(Number(e.target.value)))}
            >
              {
              getStages()
              }
            </Select>
            <FormHelperText>
              <FormControlLabel control={<Checkbox checked={autoAscend} onChange={(e) => dispatch(setAutoAscend(e.target.checked))} />} label="Auto Ascend" />
            </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            max # of mods: {layerInfo[0]}
          </Grid>
          <Grid item xs={6}>
            max mod teir: {layerInfo[1]}
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div className="App">
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3} style={{ border: "solid" }}>
          <div style={{ height: "30%", display: "flex", borderBottom: "solid" }}>
            {navDisplay()}
          </div>
          <div style={{height: "70%" }}>
            <Character/>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Main/>
        </Grid>
        <Grid item xs={3} style={{ border: "solid" }}>
          <div style={{ height: "45%" }}>
            <Inventory/>
          </div>
          <Recycle/>
          <div style={{ height: "45%"}}>
            <Drops/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
