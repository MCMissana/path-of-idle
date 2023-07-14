import { Button, Grid, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { applyGearToCharacter } from '../../helpers/applyGearToCharacter';
import { getArrayOfEquipt } from '../../helpers/getArrayOfEquipt';
import { item } from '../../models/newItem';
import { equip, setMaxWin } from '../../store/character/characterSlice';
import { setAutoAscend, setStage, startGame, stopGame } from '../../store/game/gameSlice';
import { generateDrop } from '../../store/inventory/inventorySlice';
import { RootState } from '../../store/store';


export function Main() {

    const dispatch = useDispatch()
    const stage = useSelector((state: RootState) => state.game.stage)
    const autoAscend = useSelector((state: RootState) => state.game.autoAscend)
    const stats = useSelector((state: RootState) => state.character.stats)
    const currentEquipt = useSelector((state: RootState) => state.character.equipt)

    const getPlayer = () => {
        return {
            health: 50,
            damage: Math.max(stats?.damage,1),
            attackTime: 2,
            hitChance: 0.8,
            dodge: 0.1,
            block: 0.1
        }
    }

    // how could this be a seed. ie every level is a random character seed that is generated for that levels gear
    // each season has a different set of seeds for each level. this seed is generated through a function for a given layer
    const getEnemy = () => {
        return {
            health: (50 + (stage * 1)),
            damage: Math.max(stage*1,1),
            attackTime: 2,
            hitChance: (0.8 + (stage * 0.001)),
            dodge: (0.1 + (stage * 0.001)),
            block: (0.1 + (stage * 0.001))
        }
    }

    const basePlayer = getPlayer();
    const baseEnemy = getEnemy();
  
    const [player, setPlayer] = useState({ ...basePlayer });
    const [enemy, setEnemy] = useState({ ...baseEnemy });
    const [running, setRunning] = useState(false);
    const [playerLog, setPlayerLog] = useState([]);
    const [enemyLog, setEnemyLog] = useState([]);
    const [turn, setTurn] = useState(0);
    const [restart, setRestart] = useState(false);
  
    useEffect(() => {
      if (turn === 0) {
        //nothing
      } else {
        gameTurn();
      }
    }, [turn]);

    useEffect(() => {
      if (restart === true) {
        setTimeout(() => start(), 1000)
        setRestart(false)
      }
    }, [restart]);
  
    // const start = () => {
    //   if (!running) {
    //     console.log("start");
    //     setRunning(setInterval(gameTurn, 3000));
    //   } else {
    //     console.log("stop");
    //     clearInterval(running);
    //     setRunning(null);
    //   }
    // };
    const start = async () => {

      const arrOfEquipt: Array<item> = getArrayOfEquipt(currentEquipt)
      
      if (!running) {
        dispatch(startGame())
        setPlayerLog([]);
        setEnemyLog([]);
        setPlayer(window.structuredClone(applyGearToCharacter(arrOfEquipt)))
        setEnemy(getEnemy())
        setRunning(true);
        setTurn(1);
      } else {
        setTurn(0);
        setRunning(false);
      }
    };
  
    const logEntry = (player, message: string) => {
      if (player) {
        let tempLog = playerLog;
        if (tempLog.length > 4) {
          tempLog.pop();
          tempLog.unshift(message);
        } else {
          tempLog.unshift(message);
        }
        setPlayerLog(tempLog);
      } else {
        let tempLog = enemyLog;
        if (tempLog.length > 4) {
          tempLog.pop();
          tempLog.unshift(message);
        } else {
          tempLog.unshift(message);
        }
        setEnemyLog(tempLog);
      }
    };
  
    // returns damage
    const action = (p1, p2) => {
      //player turn
      if (Math.random() < p1.hitChance) {
        if (Math.random() > p2.dodge) {
          if (Math.random() > p2.block) {
            return {
              damage: p1.damage,
              message: `Attacked dealing ${p1.damage}`
            };
          } else {
            return {
              damage: p1.damage / 2,
              message: `Attack Blocked ${p1.damage / 2}`
            };
          }
        }
        return {
          damage: 0,
          message: "Attack Dodged"
        };
      }
      return {
        damage: 0,
        message: "Attack Missed"
      };
    };
  
    const gameTurn = () => {
      
        if (!running) {
        endGame(false);
        return;
      }
      let result;
      let result2;
      let tempP1 = JSON.parse(JSON.stringify(player));
      let tempP2 = JSON.parse(JSON.stringify(enemy));
      //player turn
      // console.log(turn % Math.max(Math.ceil(tempP1.attackTime), 1));
      if (turn % Math.max(Math.ceil(tempP1.attackTime), 1) === 0) {
        result = action(tempP1, tempP2);
      }
  
      if (result) tempP2.health = tempP2.health - result.damage;
  
      // enemy turn
      if (turn % Math.max(Math.ceil(tempP2.attackTime), 1) === 0) {
        result2 = action(tempP2, tempP1);
      }
      if (result2) tempP1.health = tempP1.health - result2.damage;
  
      // set states check to reduce re-renders
      if (result?.damage) {
        setEnemy({ ...tempP2 });
      }
      if (result) logEntry(true, `${turn} - ${result.message}`);
      if (result2?.damage) {
        setPlayer({ ...tempP1 });
      }
      if (result2) logEntry(false, `${turn} - ${result2.message}`);
      if (tempP1.health < 1 || tempP2.health < 1)
        endGame(tempP1.health > tempP2.health);
      else if (turn) setTimeout(() => setTurn(turn + 1), 1000);
    };
  
    const endGame = (win: boolean) => {
      dispatch(stopGame())
      setTurn(0);
      setRunning(false);
      logEntry(win, `${win ? "player" : "enemy"} wins`)
      setPlayer({ ...basePlayer });
      setEnemy({ ...baseEnemy });
      if (win) {
        dispatch(setMaxWin(stage))
        dispatch(generateDrop(stage))
        if(autoAscend){
          dispatch(setStage(stage + 1))
          setRestart(true)
        }
      }else{
        dispatch(setAutoAscend(false))
      }
    };
  
    return (
      <div className="App">
        <Grid container spacing={2} style={{ padding: "10%" }}>
          <Grid item xs={12}>
            <p>{turn}</p>
          </Grid>
          <Grid item xs={6} style={{minHeight: "20vh"}}>
            <LinearProgress
              variant="determinate"
              value={100 * (player.health / basePlayer.health)}
            />
            { running &&
              <div>
                <p>Health: {player.health}</p>
                <p>Damage: {player.damage}</p>
                <p>Attack Time: {player.attackTime}</p>
                <p>Hit Chance: {player.hitChance}</p>
                <p>Dodge: {player.dodge}</p>
                <p>Block: {player.block}</p>
              </div>
            }
            <div className="logHolder">
              {playerLog.map((m) => (
                <p key={Math.random()}>{m}</p>
              ))}
            </div>
            {/* <h2>{player.health}</h2> */}
          </Grid>
          <Grid item xs={6}>
            {/* <h2>{enemy.health}</h2> */}
            <LinearProgress
              variant="determinate"
              value={100 * (enemy.health / baseEnemy.health)}
              color="secondary"
            />
            { running &&
              <div>
                <p>health: {enemy.health}</p>
                <p>Damage: {enemy.damage}</p>
                <p>Attack Time: {enemy.attackTime}</p>
                <p>Hit Chance: {enemy.hitChance}</p>
                <p>Dodge: {enemy.dodge.toFixed(3)}</p>
                <p>Block: {enemy.block.toFixed(3)}</p>
              </div>
            }
            <div className="logHolder">
              {enemyLog.map((m) => (
                <p key={Math.random()}>{m}</p>
              ))}
            </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={() => start()} color={running || restart ? "error" : "primary"}>
          {running || restart ? "Stop" : "Start"}
        </Button>
        <Button variant="contained" onClick={() => dispatch(generateDrop(stage))} color="info">
         Generate Drop
        </Button>
      </div>
    );
}