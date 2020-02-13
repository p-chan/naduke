import * as React from 'react'
import { createContainer } from 'unstated-next'

const authTestFetch = async (token: string) => {
  const formData = new FormData()

  formData.append('token', token)

  return await fetch('https://slack.com/api/auth.test', {
    method: 'POST',
    body: formData
  })
}

const useUserContainer = () => {
  const [xoxsTokenState, setXoxsTokenState] = React.useState('')
  const [isAuthTestFetching, setIsAuthTestFetching] = React.useState(false)

  const handleAuthTest = async (token: string) => {
    setIsAuthTestFetching(true)

    const authTestData = await authTestFetch(token).then(response => {
      setIsAuthTestFetching(false)

      return response.json()
    })

    if (!authTestData.ok) return

    setXoxsTokenState(token)
  }

  return { xoxsTokenState, isAuthTestFetching, handleAuthTest }
}

export const UserContainer = createContainer(useUserContainer)
