import { useState, useEffect, useMemo } from 'react'
import { css } from '@emotion/css'
import { profileById, profileByHandle, client } from './graphql'
import {
  systemFonts,
  returnIpfsPathOrUrl,
  getRandomColor
} from './utils'
import { ThemeColor, Theme } from './types'

export function ProfileListItem({
  profileId,
  handle,
  theme = Theme.default,
  profile: baseProfile,
  onClick,
  onFollowPress,
  containerStyle,
  followButtonContainerStyle,
  followButtonStyle,
  isFollowing = false
} : {
  handle?: string,
  profileId?: string,
  theme?: Theme
  profile?: any,
  onClick?: () => void,
  onFollowPress?: () => void,
  containerStyle?: {},
  followButtonContainerStyle?: {},
  followButtonStyle?: {},
  isFollowing?: boolean
}) {
  let [profile, setProfile] = useState<any | undefined>()
  useEffect(() => {
    if (profileId || handle) {
      fetchProfile()
    }
  }, [profileId, handle])
  const color = useMemo(() => getRandomColor(), [profileId, handle]);
  async function fetchProfile() {
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
        setProfile(data.profile)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    } 
    if (profileId) {
      try {
        try {
          const { data } = await client
            .query(profileById, {
              profileId
            })
          .toPromise()
          setProfile(data.profile)
        } catch (err) {
          console.log('error fetching profile... ', err)
        }
      } catch (err) {
        console.log('err: ', err)
      }
    }
  }

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
  if (baseProfile) profile = baseProfile
  if (!profile) return null
  
  return (
    <div
      style={containerStyle ? containerStyle : {}}
      className={profileContainerStyle(theme)}
      onClick={onProfilePress}
    >
        <div className={contentContainerStyle}>
          <div>
          {
            profile.picture?.__typename === 'MediaSet'
            || profile.picture?.__typename === 'NftImage'
            ? (
              <div
                className={getProfilePictureContainerStyle}
              >
                <img
                  src={returnIpfsPathOrUrl(
                    profile.picture.__typename === 'NftImage' ?
                    profile.picture.uri : profile.picture?.original?.url
                  )}
                  className={profilePictureStyle}
                />
              </div>
              ) : (
                <div
                  className={emptyProfileStyle(color)}
                />
              )
          }
          {
            profile.picture === null && (
              <div className={emptyProfilePictureStyle} />
            )
          }
          </div>
          <div className={profileInfoContainerStyle}>
            <p className={profileNameStyle(theme)}>{profile.name || profile.handle}</p>
            <p className={profileHandleStyle(theme)}>@{profile.handle}</p>
          </div>
          <div
            style={followButtonContainerStyle ? followButtonContainerStyle : {}}
            className={getFollowButtonContainerStyle(theme)}
          >
            <button
              onClick={e => {
                e.stopPropagation()
                onFollowPress ? onFollowPress() : onProfilePress()
              }}
              style={followButtonStyle ? followButtonStyle : {}}
              className={getFollowButtonStyle(theme)}>
              <p>
                { isFollowing ? 'Unfollow' : 'Follow'}
              </p>
            </button>
          </div>
        </div>
    </div>
  )
}

const getFollowButtonStyle = theme => {
  let backgroundColor = '#3d4b41'
  let color = 'white'
  if (theme === Theme.dark) {
    color = '#191919'
    backgroundColor = '#C3E4CD'
  }
  return css`
    background-color: ${backgroundColor};
    color: ${color};
    outline: none;
    border: none;
    padding: 5px 25px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer
  `
}

const getFollowButtonContainerStyle = theme => {
  return css`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  `
}

const profileNameStyle = theme => {
  let color = ThemeColor.black
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return css`
  color: ${color};
  line-height: 16px;
  font-weight: 500;
  margin-top: 2px;
`
} 

const profileHandleStyle = theme => {
  let color = ThemeColor.darkGray
  if (theme === Theme.dark) {
    color = ThemeColor.white
  }
  return css`
    color: ${color};
    opacity: .5;
    font-size: 14px;
    margin-top: 3px;
  `
}

const profileInfoContainerStyle = css`
  margin-left: 10px;
`

const contentContainerStyle = css`
  display: flex;
`

const getProfilePictureContainerStyle = css``

const profilePictureStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

const emptyProfilePictureStyle = css``

const system = css`
  font-family: ${systemFonts} !important
`

const profileContainerStyle = theme => {
  let backgroundColor = 'transparent'
  if (theme === Theme.dark) {
    backgroundColor = ThemeColor.lightBlack
  }
  return css`
    cursor: pointer;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    background-color: ${backgroundColor};
    * {
      ${system};
    }
  `
}

const emptyProfileStyle = color => css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${color};
`