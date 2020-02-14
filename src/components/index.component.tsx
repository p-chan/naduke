import * as React from 'react'

import { UserContainer } from '../containers'

import { HeaderComponent } from './header.component'
import { AuthFormComponent } from './authForm.component'
import { EmojiListComponent } from './emojiList.component'

export const IndexComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  if (user.xoxsTokenState === '') {
    return (
      <>
        <HeaderComponent />
        <AuthFormComponent />
      </>
    )
  }

  return (
    <>
      <HeaderComponent />
      <EmojiListComponent />
    </>
  )
}
