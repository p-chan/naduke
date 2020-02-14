import * as React from 'react'

import { emojiModel } from '../../models'

type Props = {
  emoji: emojiModel.EmojiModel
}

export const ItemComponent: React.FC<Props> = (props: Props) => {
  const aliasesElementIfNeeded = props.emoji.aliases && (
    <ul>
      {props.emoji.aliases.map(alias => (
        <li key={alias}>{alias}</li>
      ))}
    </ul>
  )

  return (
    <li key={props.emoji.name}>
      <img
        src={props.emoji.url}
        width={128}
        height={128}
        alt={props.emoji.name}
        loading={'lazy'}
      />
      <span>{props.emoji.name}</span>
      {aliasesElementIfNeeded}
    </li>
  )
}
