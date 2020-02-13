import * as React from 'react'

import { emojiModel } from '../models'

import { UserContainer } from '../containers'

export const EmojiListComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const [emojiListState, setEmojiListState] = React.useState<
    emojiModel.EmojiModel[]
  >([])

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

  const emojiListItemElements = emojiListState.map(item => {
    if (item.type === 'alias') return

    return (
      <li key={item.name}>
        <img src={item.url} width={128} height={128} alt={item.name} />
        <span>{item.name}</span>
      </li>
    )
  })

  return (
    <>
      <ul>{emojiListItemElements}</ul>
    </>
  )
}
