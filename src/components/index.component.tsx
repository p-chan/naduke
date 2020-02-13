import * as React from 'react'

import { UserContainer } from '../containers'

import { AuthFormComponent } from './authForm.component'

export const IndexComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const authFormComponentIfNeeded = user.xoxsTokenState === '' && (
    <AuthFormComponent />
  )

  return (
    <>
      <h1>naduke</h1>
      {authFormComponentIfNeeded}
    </>
  )
}
