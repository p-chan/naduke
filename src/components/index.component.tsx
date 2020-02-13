import * as React from 'react'

import { UserContainer } from '../containers'

import { AuthFormComponent } from './authForm.component'
import { EmojiListComponent } from './emojiList.component'

export const IndexComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const authFormComponentIfNeeded = user.xoxsTokenState === '' && (
    <AuthFormComponent />
  )

  const emojiListComponentIfNeeded = user.xoxsTokenState !== '' && (
    <EmojiListComponent />
  )

  return (
    <>
      <h1>naduke</h1>
      {authFormComponentIfNeeded}
      {emojiListComponentIfNeeded}
    </>
  )
}
