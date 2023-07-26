import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { Profile, ThemeColor, ProfileHandle, Theme } from './types'
import { client } from './graphql/client'
import {
  profileById,
  profileByAddress,
  getFollowers,
  profileByHandle
} from './graphql'
import {
  formatProfilePicture,
  systemFonts,
  formatHandleColors,
  returnIpfsPathOrUrl,
  formatHandleList,
  getSubstring
} from './utils'

export function Profile({
  profileId,
  ethereumAddress,
  handle,
  onClick,
  theme = Theme.default,
  containerStyle = profileContainerStyle,
  hideFollowButton,
  ipfsGateway
} : {
  profileId?: string,
  handle?: string,
  ethereumAddress?: string,
  onClick?: () => void,
  theme?: Theme,
  containerStyle?: {},
  hideFollowButton?: boolean,
  ipfsGateway?: string
}) {
  const [profile, setProfile] = useState<any | undefined>()
  const [followers, setFollowers] = useState<ProfileHandle[]>([])

  useEffect(() => {
    fetchProfile()
  }, [profileId, handle, ethereumAddress])

  function onProfilePress() {
    if (onClick) {
      onClick()
    } else {
       if (profile) {
        const URI = `https://share.lens.xyz/u/${profile.handle}`
        window.open(URI, '_blank')
       }
    }
  }

  async function fetchFollowers(id: string) {
    try {
      const { data } = await client
        .query(getFollowers, {
          profileId: id
        })
       .toPromise()

      let filteredProfiles = data.followers.items.filter(p => p.wallet.defaultProfile.handle)
      filteredProfiles = filteredProfiles.filter(p => p.wallet.defaultProfile.picture)
      filteredProfiles = filteredProfiles.filter(p => p.wallet.defaultProfile.picture.original)
      let first3 = JSON.parse(JSON.stringify(filteredProfiles.slice(0, 3)))
      first3 = first3.map(profile => {
        profile.handle = profile.wallet.defaultProfile.handle
        profile.picture = returnIpfsPathOrUrl(profile.wallet.defaultProfile.picture.original.url, ipfsGateway)
        return profile
      })
      setFollowers(first3)
    } catch (err) {
      console.log('error fetching followers ...', err)
    }
  }

  async function fetchProfile() {
    if (!profileId && !ethereumAddress && !handle) {
      return console.log('please pass in either a Lens profile ID or an Ethereum address')
    }
    if (handle) {
      try {
        handle = handle.toLowerCase()
        if (!handle.includes('.lens')) {
          handle = handle + '.lens'
        }
        if (handle === 'lensprotocol.lens') {
          handle = 'lensprotocol'
        }
        const { data } = await client
          .query(profileByHandle, {
            handle
          })
          .toPromise()
        formatProfile(data.profile)
        fetchFollowers(data.profile.id)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    } else if (profileId) {
      try {
        const { data } = await client
          .query(profileById, {
            profileId
          })
        .toPromise()
        fetchFollowers(profileId)
        formatProfile(data.profile)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    } else {
      try {
        const { data } = await client
          .query(profileByAddress, {
            address: ethereumAddress
          })
          .toPromise()
        fetchFollowers(data.defaultProfile.id)
        formatProfile(data.defaultProfile)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    }
  }
  function formatProfile(profile: Profile) {
    let copy = formatProfilePicture(profile)
    setProfile(copy)
  }
  if (!profile) return null

  return (
    <div style={containerStyle} className={profileContainerClass} onClick={onProfilePress}>
      <div className={headerImageContainerStyle}>
        <div>
          {
            profile.coverPicture?.__typename === 'MediaSet' ? (
              <div
                style={getHeaderImageStyle(profile?.coverPicture?.original?.url)}
              />
              ) : <div style={getHeaderImageStyle()} />
          }
          <div>
          {
            profile.picture?.__typename === 'MediaSet'
            || profile.picture?.__typename ===  'NftImage'? (
              <div
                className={getProfilePictureContainerStyle(theme)}
              >
                <img
                  src={
                    profile.picture.__typename === 'NftImage' ?
                    profile.picture.uri : profile.picture?.original?.url
                  }
                  className={profilePictureStyle}
                />
              </div>
              ) : null
          }
          {
            profile.picture === null && (
              <div className={emptyProfilePictureStyle} />
            )
          }
          </div>
        </div>
      </div>
      <div className={getProfileInfoContainerStyle(theme)}>
          <div className={getButtonContainerStyle(hideFollowButton)}>
            <button style={getButtonStyle(theme)}>Follow</button>
          </div>
          <div className={profileNameAndBioContainerStyle}>
          <p className={profileNameStyle}>{profile.name || profile.handle}</p>
          {
            profile.bio && (
              <p className={bioStyle} dangerouslySetInnerHTML={{
                __html: formatHandleColors(getSubstring(profile.bio))
              }} /> 
            )
          }
        </div>
        <div className={getStatsContainerStyle(theme)}>
          <p>
            {profile.stats.totalFollowing.toLocaleString('en-US')} <span>Following</span> 
          </p>
          <p>
            {profile.stats.totalFollowers.toLocaleString('en-US')} <span>Followers</span> 
          </p>
        </div>
        <div className={getFollowedByContainerStyle(theme)}>
          <div className={miniAvatarContainerStyle}>
            {
              followers.map(follower => (
                <div key={follower.handle} className={getMiniAvatarWrapper()}>
                  <img src={follower.picture} className={getMiniAvatarStyle(theme)} />
                </div>
              ))
            }
          </div>
          <p>
          {
            Boolean(followers.length) && <span>Followed by</span>
          }
          {
            formatHandleList(followers.map(follower => follower.handle))
          }</p>
        </div>
      </div>
    </div>
  )
}

const profileContainerStyle = {
  borderRadius: '18px',
  overflow: 'hidden',
  cursor: 'pointer'
}

const emptyProfilePictureStyle = css`
  background-color: green;
  width: 60px;
  height: 60px;
  display: flex;
  left: 0;
  bottom: -50px;
  width: 138px;
  height: 138px;
  border-radius: 70px;
  position: absolute;
  margin-left: 20px;
  border: 4px solid white;
`

const system = css`
  font-family: ${systemFonts} !important
`

const headerImageContainerStyle = css`
  position: relative;
`

const profileNameAndBioContainerStyle = css`
  margin-top: 15px;
`

const profileNameStyle = css`
  font-size: 26px;
  font-weight: 700;
  margin: 0;
`

const bioStyle = css`
  font-weight: 500;
  margin-top: 9px;
  margin-bottom: 0;
  line-height: 24px;
`

const profileContainerClass = css`
  width: 510px;
  @media (max-width: 510px) {
    width: 100%
  }
  * {
    ${system};
  }
`

const miniAvatarContainerStyle = css`
  display: flex;
  margin-left: 10px;
  margin-right: 14px;
`

const profilePictureStyle = css`
  width: 128px;
  height: 128px;
  border-radius: 70px;
`

function getFollowedByContainerStyle(theme:Theme) {
  let color = ThemeColor.darkGray
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return css`
  margin-top: 20px;
  display: flex;
  color: ${color};
  align-items: center;
  span {
    opacity: .5;
    margin-right: 4px;
  }
  p {
    margin-right: 5px;
    margin-bottom: 0;
    margin-top: 0;
    font-weight: 600;
    font-size: 14px;
  }
`
}

function getStatsContainerStyle(theme: Theme) {
  let color = ThemeColor.darkGray
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return css`
    display: flex;
    margin-top: 15px;
    * {
      font-weight: 600;
    }
    p {
      margin-right: 10px;
      margin-top: 0;
      margin-bottom: 0;
    }
    span {
      color: ${color};
      opacity: 50%;
    }
    @media (max-width: 510px) {
      p {
        margin: 8px 10px 8px 0px;
      }
    }
  `
}

function getProfileInfoContainerStyle(theme: Theme) {
  let backgroundColor = ThemeColor.white
  let color = ThemeColor.black
  if (theme === Theme.dark) {
    backgroundColor = ThemeColor.lightBlack
    color = ThemeColor.white
  }
  return css`
    background-color: ${backgroundColor};
    padding: 0px 20px 20px;
    p {
      color: ${color};
    }
  `
}

function getButtonContainerStyle(hidden) {
  const visibility = hidden ? 'hidden' : 'visible'
  return css`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    visibility: ${visibility};
  `
}

function getMiniAvatarWrapper() {
  return css`
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
  return css`
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
  return css`
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

function getHeaderImageStyle(url?:string) {
  const backgroundImage = url ? `url(${url})` : 'none'
  return {
    height: '245px',
    backgroundColor: ThemeColor.lightGreen,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: backgroundImage,
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
  }
}

function getButtonStyle(theme: Theme) {
  let backgroundColor = '#3d4b41'
  let color = 'white'
  if (theme === Theme.dark) {
    color = '#191919'
    backgroundColor = '#C3E4CD'
  }
  return {
    marginTop: '10px',
    outline: 'none',
    border: 'none',
    padding: '10px 32px',
    backgroundColor,
    borderRadius: '50px',
    color,
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  }
}