<script lang="ts">
  import './styles.css'
  import './global.d.ts'
  import { Theme, Size, type Tokens, type Profile } from './types'
  import { getContainerStyle, getTextStyle } from './utils'
  import { ethers } from 'ethers'
  import {
    challenge,
    authenticate,
    profileByAddress
  } from './graphql'
  import { ApolloClient, InMemoryCache } from '@apollo/client/core'
  import { setClient } from "svelte-apollo"

  import LensIcon from './LensIcon.svelte'

  const API_URL = 'https://api.lens.dev'

  export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  })
  setClient(client);

  export let theme: Theme = Theme.default
  export let size: Size = Size.medium
  export let title: string = "Sign in with Lens"
  export let provider: ethers.BrowserProvider | undefined = undefined
  export let onSignIn: (tokens: Tokens, profile: Profile) => void

  let authTokens: Tokens
  let authenticating: boolean
  let profile: Profile
  
  async function authenticateWithLens() {
    try {
      if (authenticating) return
      if (authTokens && profile) {
        onSignIn(authTokens, profile)
        return
      }
      authenticating = true
      if (!provider && window.ethereum) {
        provider = await getProvider()
      }
      if (!provider) {
        console.log('no provider configured...')
        authenticating = false
        return
      }
      const address = await getAddress()

      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const signer = await provider.getSigner()

      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      const { data: { authenticate: tokens }} = authData
      const profileData = await client.query({
        query: profileByAddress,
        variables: {
          address, signature
        }
      })
      const { data: { defaultProfile }} = profileData
      profile = defaultProfile
      authTokens = tokens
      onSignIn(tokens, defaultProfile)
      authenticating = false
    } catch (err) {
      console.log('error signing in with Lens...', err)
      authenticating = false
    }
  }
  async function getAddress() {
    const response = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return response[0]
  }
  async function getProvider() {
    if (typeof window.ethereum !== "undefined") {
        try {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        return new ethers.BrowserProvider(window.ethereum)
      } catch (err) {
        console.log('error connecting wallet and signing in...', err)
      }
    }
  }
</script>

<button on:click={authenticateWithLens} class="button"  style={getContainerStyle(theme, size)}>
  <LensIcon theme={theme} size={size} />
  <p class='text' style={getTextStyle(theme, size)}>{title}</p>
</button>

<style>
  .button {
    outline: none;
    border: none;
    border-radius: 50;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .text {
    margin: 0px 0px 0px 6px;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
</style>