import * as React from 'react'

import { emojiModel } from '../models'

import { UserContainer } from '../containers'

type IntegratedEmojiModel = {
  name: string
  url: string
  aliases: string[]
}

export const EmojiListComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const [emojiListState, setEmojiListState] = React.useState<
    emojiModel.EmojiModel[]
  >([])

  const [
    integratedEmojiListState,
    setIntegratedEmojiListState
  ] = React.useState<IntegratedEmojiModel[]>([])

  React.useEffect(() => {
    const integratedEmojiObject: { [key: string]: IntegratedEmojiModel } = {}

    for (let i = 0; i < emojiListState.length; i++) {
      const item = emojiListState[i]

      if (item.type === 'original') {
        integratedEmojiObject[item.name] = {
          name: item.name,
          url: item.url,
          aliases: []
        }
      }
    }

    for (let i = 0; i < emojiListState.length; i++) {
      const item = emojiListState[i]

      if (item.type === 'alias') {
        if (item.name !== 'white_square' && item.name !== 'black_square') {
          integratedEmojiObject[item.originalName]['aliases'].push(item.name)
        }
      }
    }

    setIntegratedEmojiListState(Object.values(integratedEmojiObject))
  }, [emojiListState])

  React.useEffect(() => {
    const getEmojiListData = async () => {
      const formData = new FormData()

      formData.append('token', user.xoxsTokenState)

      return await fetch('https://slack.com/api/emoji.list', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
    }

    getEmojiListData().then(json => {
      setEmojiListState(emojiModel.createEmojis(json.emoji))
    })
  }, [])

  const emojiListItemElements = integratedEmojiListState.map(item => {
    return (
      <li key={item.name}>
        <img src={item.url} width={128} height={128} alt={item.name} />
        <span>{item.name}</span>
        <span>{item.aliases}</span>
      </li>
    )
  })

  return (
    <>
      <ul>{emojiListItemElements}</ul>
    </>
  )
}
