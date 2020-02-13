import * as React from 'react'

import { UserContainer } from '../containers'

export const AuthFormComponent: React.FC = () => {
  const user = UserContainer.useContainer()

  const [xoxsTokenState, setXoxsTokenState] = React.useState('')

  const onChangeNewXoxsTokenState = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setXoxsTokenState(e.currentTarget.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await user.handleAuthTest(xoxsTokenState)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="xoxsToken"
        id="xoxsToken"
        value={xoxsTokenState}
        onChange={onChangeNewXoxsTokenState}
      />
      <button type="submit" disabled={user.isAuthTestFetching}>
        Submit
      </button>
    </form>
  )
}
