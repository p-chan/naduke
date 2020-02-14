import * as React from 'react'

import { emojiModel } from '../models'

import { UserContainer } from '../containers'

import { ItemComponent } from './emojiList'

export const EmojiListComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const [emojiListState, setEmojiListState] = React.useState<
    emojiModel.EmojiModel[]
  >([])

  const [
    integratedEmojiListState,
    setIntegratedEmojiListState
  ] = React.useState<emojiModel.IntegratedEmojiModel[]>([])

  React.useEffect(() => {
    const integratedEmojiObject: {
      [key: string]: emojiModel.IntegratedEmojiModel
    } = {}

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
    const formData = new FormData()

    formData.append('token', user.xoxsTokenState)

    fetch('https://slack.com/api/emoji.list', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        setEmojiListState(emojiModel.createEmojis(json.emoji))
      })
  }, [])

  const itemComponents = integratedEmojiListState.map(item => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        url={item.url}
        aliases={item.aliases}
      />
    )
  })

  return (
    <>
      <ul>{itemComponents}</ul>
    </>
  )
}
