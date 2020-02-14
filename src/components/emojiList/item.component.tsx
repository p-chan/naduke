import * as React from 'react'

import { emojiModel } from '../../models'

type Props = {
  name: emojiModel.IntegratedEmojiModel['name']
  url: emojiModel.IntegratedEmojiModel['url']
  aliases: emojiModel.IntegratedEmojiModel['aliases']
}

export const ItemComponent: React.FC<Props> = (props: Props) => {
  const aliasesElementIfNeeded = props.aliases && (
    <ul>
      {props.aliases.map(alias => (
        <li key={alias}>{alias}</li>
      ))}
    </ul>
  )

  return (
    <li key={props.name}>
      <img
        src={props.url}
        width={128}
        height={128}
        alt={props.name}
        loading={'lazy'}
      />
      <span>{props.name}</span>
      {aliasesElementIfNeeded}
    </li>
  )
}
