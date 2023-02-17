<script lang="ts">
import './styles.css'
import { onMount } from 'svelte'
import { type Profile, type ProfileHandle, Theme, ThemeColor } from './types'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setClient } from "svelte-apollo"
import {
  profileById,
  profileByAddress,
  getFollowers,
  profileByHandle
} from './graphql'
import {
  formatProfilePicture,
  formatHandleColors,
  returnIpfsPathOrUrl,
  formatHandleList,
  getSubstring
} from './utils'

const API_URL = 'https://api.lens.dev'

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})
setClient(client)

const profileContainerStyle = `
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
`

export let profileId: string | undefined = undefined
export let ethereumAddress: string | undefined = undefined
export let handle: string | undefined = undefined
export let onClick: undefined | (() => void) = undefined
export let theme = Theme.default
export let containerStyle = profileContainerStyle

let profile:Profile
let followers:ProfileHandle[]

onMount(async () => {
  await fetchProfile()
})

function onProfilePress() {
  if (onClick) {
    onClick()
  } else {
      if (profile) {
      const URI = `https://lenster.xyz/u/${profile.handle}`
      window.open(URI, '_blank')
      }
  }
}

async function fetchFollowers(id: string) {
  try {
    const response = await client.query({
      query: getFollowers,
      variables: {
        profileId: id
      }
    })
    let filteredProfiles = response.data.followers.items.filter(p => p.wallet.defaultProfile.handle)
    filteredProfiles = filteredProfiles.filter(p => p.wallet.defaultProfile.picture)
    filteredProfiles = filteredProfiles.filter(p => p.wallet.defaultProfile.picture.original)
    let first3 = JSON.parse(JSON.stringify(filteredProfiles.slice(0, 3)))
    first3 = first3.map(profile => {
      profile.handle = profile.wallet.defaultProfile.handle
      profile.picture = returnIpfsPathOrUrl(profile.wallet.defaultProfile.picture.original.url)
      return profile
    })
    followers = first3
  } catch (err) {
    console.log('error fetching followers ...', err)
  }
}

async function fetchProfile() {
  if (!profileId && !ethereumAddress && !handle) {
    return console.log('please pass in either a Lens profile ID or an Ethereum address')
  }
  if (profileId) {
    console.log('about to fetch ...')
    try {
      const profileData = await client.query({
        query: profileById,
        variables: {
          profileId
        }
      })
      fetchFollowers(profileId)
      profile = formatProfilePicture(profileData.data.profile)
      console.log('profile: ', profile)
    } catch (err) {
      console.log('error fetching profile... ', err)
    }
  } else if (handle) {
    handle = handle.toLowerCase()
    if (!handle.includes('.lens')) {
      handle = handle + '.lens'
    }
    const profileData = await client.query({
        query: profileByHandle,
        variables: {
          handle
        }
      })
      fetchFollowers(profileData.data.profile.id)
      profile = formatProfilePicture(profileData.data.profile)
  } else {
    try {
      const profileData = await client.query({
        query: profileByAddress,
        variables: {
          address: ethereumAddress
        }
      })
      fetchFollowers(profileData.data.defaultProfile.id)
      profile = formatProfilePicture(profileData.data.defaultProfile)
    } catch (err) {
      console.log('error fetching profile... ', err)
    }
  }
}

const headerImageContainerStyle = `
  position: relative;
`

const profileNameAndBioContainerStyle = `
  margin-top: 15px;
`

const profileNameStyle = `
  font-size: 26px;
  font-weight: 700;
`

const bioStyle = `
  font-weight: 500;
  margin-top: 9px;
  line-height: 24px;
`

const miniAvatarContainerStyle = `
  display: flex;
  margin-left: 10px;
  margin-right: 14px;
`

const profilePictureStyle = `
  width: 128px;
  height: 128px;
  border-radius: 70px;
`

function getFollowedByContainerStyle(theme:Theme) {
  let color = ThemeColor.darkGray
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return `
  margin-top: 20px;
  display: flex;
  color: ${color};
  align-items: center;
`
}

function getStatsContainerStyle(theme: Theme) {
  return `
    display: flex;
    margin-top: 15px;
    font-weight: 600;
  `
}

function getSpanColor(theme: Theme) {
  let color = ThemeColor.darkGray
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return `
  opacity: 50%;
  color: ${color};
  `
}

function getProfileInfoContainerStyle(theme: Theme) {
  let backgroundColor = ThemeColor.white
  if (theme === Theme.dark) {
    backgroundColor = ThemeColor.lightBlack
  }
  return `
    background-color: ${backgroundColor};
    padding: 0px 20px 20px;
  `
}

function getButtonContainerStyle() {
  return `
    display: flex;
    flex: 1;
    justify-content: flex-end;
  `
}

function getMiniAvatarWrapper() {
  return `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin-left: -10px;
    borderRadius: 20px;
  `
}

function getMiniAvatarStyle(theme: Theme) {
  let color = ThemeColor.white
  if (theme === Theme.dark) {
    color = ThemeColor.lightBlack
  }
  return `
    width: 34px;
    height: 34px;
    border-radius: 20px;
    outline: 2px solid ${color};
    background-color: ${color};
  `  
}

function getProfilePictureContainerStyle(theme: Theme) {
  let backgroundColor = ThemeColor.white
  if (theme === Theme.dark) {
    backgroundColor = ThemeColor.lightBlack
  }
  return `
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    bottom: -50px;
    background-color: ${backgroundColor};
    width: 138px;
    height: 138px;
    border-radius: 70px;
    margin-left: 20px;
  `
}

function getHeaderImageStyle(url:string) {
  return `
    height: 245px;
    background-color: ${ThemeColor.lightGreen};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(${url});
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  `
}

function getButtonStyle(theme: Theme) {
  let backgroundColor = '#3d4b41'
  let color = 'white'
  if (theme === Theme.dark) {
    color = '#191919'
    backgroundColor = '#C3E4CD'
  }
  return `
    margin-top: 10px;
    outline: none;
    border: none;
    padding: 10px 32px;
    background-color: ${backgroundColor};
    border-radius: 50px;
    color: ${color};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  `
}

function getProfileMainFontColor(theme: Theme) {
  if (theme === Theme.dark) {
    return 'white-text '
  } else {
    return 'black-text'
  }
}

</script>

<div style={containerStyle} class="profile-container-class" on:click={onProfilePress}>
  {#if profile}
  <div style={headerImageContainerStyle}>
    <div>
      {#if profile.coverPicture?.__typename === 'MediaSet' }
        <div
          style={getHeaderImageStyle(profile?.coverPicture?.original?.url)}
        />
      {/if}
      <div>
        {#if profile.picture?.__typename === 'MediaSet'}
        <div
          style={getProfilePictureContainerStyle(theme)}
        >
          <img
            src={profile.picture.original.url}
            style={profilePictureStyle}
          />
        </div>
        {/if}
      </div>
    </div>
  </div>
  <div style={getProfileInfoContainerStyle(theme)} class={getProfileMainFontColor(theme)}>
    <div style={getButtonContainerStyle()}>
      <button style={getButtonStyle(theme)}>Follow</button>
    </div>
    <div style={profileNameAndBioContainerStyle}>
      <p style={profileNameStyle}>{profile.name}</p>
      {#if profile.bio}
      <p style={bioStyle}>{@html formatHandleColors(getSubstring(profile.bio))}</p>
      {/if}
    </div>
    <div style={getStatsContainerStyle(theme)}>
      <p style='margin-right: 8px;'>
        {profile.stats.totalFollowing.toLocaleString('en-US')} <span style={getSpanColor(theme)}>Following</span> 
      </p>
      <p>
        {profile.stats.totalFollowers.toLocaleString('en-US')} <span style={getSpanColor(theme)}>Followers</span> 
      </p>
    </div>
    {#if followers}
      <div style={getFollowedByContainerStyle(theme)} class="followed-by-container">
        <div style={miniAvatarContainerStyle}>
          {#each followers as follower}
            <div style={getMiniAvatarWrapper()}>
              <img src={follower.picture} style={getMiniAvatarStyle(theme)} />
            </div>
          {/each}
        </div>
        <p>
        <span>Followed by</span>
          {
          formatHandleList(followers.map(follower => follower.handle))
        }</p>
      </div>
    {/if}
  </div>
  {/if}
</div>

<style>
.profile-container-class {
  width: 510px;
}

@media (max-width: 510px) {
  .profile-container-class {
    width: 100%;
  }
}

.black-text {
  color: black;
}

.white-text {
  color: white;
}

.followed-by-container span {
  opacity: .5;
  margin-right: 4px;
}

.followed-by-container p {
  margin-right: 5px;
  font-weight: 600;
  font-size: 14px;
}

</style>