import React from 'react'
import { item } from '../../models/newItem'

type Props = {
    item: item
};
  

export function ItemDisplay({item}: Props) {

  return (
    <>
        <p>{item.name}</p>
        {item.modifiers?.map((m)=> {
            return(
                <span 
                    key={`itemDisplay-square-${m.id}`}
                    style={{color: m.effect.tier === 4 ? "red" : m.effect.tier === 3 ? "yellow" : m.effect.tier === 2 ? "blue" : m.effect.tier === 1 ? "green" : "gray"}}
                >
                    ■
                </span>
            )
        })}
    </>
  )
}