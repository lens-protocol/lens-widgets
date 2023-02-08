import { useState } from 'react'
import { Theme, Size, Tokens } from './types'
import { getContainerStyle, getTextStyle } from './utils'
import { Web3Provider } from '@ethersproject/providers'
import {ethers } from 'ethers'
import { client } from './graphql/client'
import { challenge } from './graphql/challenge'
import { authenticate } from './graphql/authenticate'
import LensIcon from './LensIcon'

declare global {
  interface Window{
    ethereum?: any
  }
}

export function SignInWithLens({
  provider,
  theme = Theme.default,
  size = Size.medium,
  title = 'Sign in With Lens',
  onSignIn,
} : {
  provider?: Web3Provider,
  theme?: Theme,
  size?: Size,
  title?: string,
  onSignIn: (tokens:Tokens) => void
}) {
  const [authTokens, setAuthTokens] = useState<Tokens | null>(null)
  const [authenticating, setAuthenticating] = useState<boolean>(false)

  async function authenticateWithLens() {
    try {
      if (authenticating) return
      if (authTokens) {
        onSignIn(authTokens)
        return
      }
      setAuthenticating(true)
      if (!provider && window.ethereum) {
        provider = await getProvider()
      }
      if (!provider) {
        console.log('no provider configured...')
        setAuthenticating(false)
        return
      }
      const address = await getAddress()
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const signer = provider.getSigner()
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      const { data: { authenticate: tokens }} = authData
      setAuthTokens(tokens)
      onSignIn(tokens)
      setAuthenticating(false)
    } catch (err) {
      console.log('error signing in with Lens...')
    }
  }
  async function getAddress() {
    const response = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return response[0]
  }
  async function getProvider() {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      return new ethers.providers.Web3Provider(window.ethereum)
    } catch (err) {
      console.log('error connecting wallet and signing in...')
    }
  }
  return (
    <button onClick={authenticateWithLens} style={getContainerStyle(theme, size)}>
      <LensIcon theme={theme} size={size} />
      <p style={getTextStyle(theme, size)}>{title}</p>
    </button>
  )
}