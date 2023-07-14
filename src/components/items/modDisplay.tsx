import React from 'react'
import { mod } from '../../models/newItem'

type Props = {
    mods: Array<mod>
};
  
export function ModDisplay({mods}: Props) {
    return (
        <>
          {mods.map((m: mod) => {
                return(
                    <p key={`ModDisplay-mod-${m.id}`}>
                        T{m.effect.tier} {m.type}: {m.effect.value}
                    </p>
                )
          })}
        </>
      )
}