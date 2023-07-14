import React from 'react'
import { gearCompare } from '../../helpers/gearCompare'


export default function DiffDisplay({characterEquipt, char = undefined, itemToCompare}) {



    let a = gearCompare(characterEquipt,char, itemToCompare)
    return (
        <>
            {
                Object.keys(a).map((e) => 
                  <p key={`diffDisplay-${e}`}>{e}: {a[e] > 0 ? <span style={{color: "greenyellow"}}>{`+${a[e].toFixed(3)}`}</span> : <span style={{color: "red"}}>{a[e].toFixed(3)}</span>}</p>
                )
            }
        </>
    )
}