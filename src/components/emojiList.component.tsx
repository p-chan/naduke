import * as React from 'react'

import { emojiModel } from '../models'

import { UserContainer } from '../containers'

import { ItemComponent } from './emojiList'

export const EmojiListComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const [emojiListState, setEmojiListState] = React.useState<
    emojiModel.EmojiModel[]
  >([])

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

  const itemComponents = emojiListState.map(item => {
    return <ItemComponent key={item.name} emoji={item} />
  })

  return (
    <>
      <ul>{itemComponents}</ul>
    </>
  )
}
