import { useState } from 'react'
import { Theme, Size, Tokens, Profile } from './types'
import { getContainerStyle, getTextStyle } from './utils'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { client } from './graphql/client'
import {
  challenge, authenticate, profileByAddress, profiles as profilesQuery
} from './graphql'
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
  onError,
  containerStyle,
  textStyle,
  icon
} : {
  provider?: Web3Provider,
  theme?: Theme,
  size?: Size,
  title?: string,
  onSignIn: (tokens: Tokens, profile: Profile) => void,
  onError?: (error) => void,
  containerStyle?: any,
  textStyle?: any,
  icon?: any
}) {
  const [authTokens, setAuthTokens] = useState<Tokens | null>(null)
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile | undefined>()

  async function authenticateWithLens() {
    try {
      if (authenticating) return
      if (authTokens && profile) {
        onSignIn(authTokens, profile)
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
      const { data: { challenge: { text }} } = await client
        .query(challenge, {
          address
        })
        .toPromise()

      const signer = provider.getSigner()
      const signature = await signer.signMessage(text)

      const { data: { authenticate: tokens } } = await client
        .mutation(authenticate, {
          address, signature
        })
        .toPromise()
      const { data: { defaultProfile } } = await client
        .query(profileByAddress, {
          address
        })
        .toPromise()
      if (!defaultProfile) {
        const { data: { profiles: { items } } } = await client
          .query(profilesQuery, {
            address
          })
        .toPromise()
        onSignIn(tokens, items[0])
        setProfile(items[0])
      } else {
        onSignIn(tokens, defaultProfile)
        setProfile(defaultProfile)
      }
      setAuthTokens(tokens)
      setAuthenticating(false)
    } catch (err) {
      setAuthenticating(false)
      console.log('error signing in with Lens...', err)
      if (onError) {
        onError(err)
      }
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
      console.log('error connecting wallet and signing in...', err)
    }
  }
  return (
    <button onClick={authenticateWithLens} style={containerStyle || getContainerStyle(theme, size)}>
      {
        icon || <LensIcon theme={theme} size={size} />
      }
      <p style={textStyle || getTextStyle(theme, size)}>{title}</p>
    </button>
  )
}