import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { Profile, ThemeColor, ProfileHandle } from './types'
import { client } from './graphql/client'
import { profileById, profileByAddress, followers as followersQuery } from './graphql'
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
  onPress,
} : {
  profileId?: string,
  ethereumAddress?: string,
  onPress?: () => void
}) {
  const [profile, setProfile] = useState<Profile | undefined>()
  const [followers, setFollowers] = useState<ProfileHandle[]>([])

  useEffect(() => {
    fetchProfile()
  }, [profileId])

  function onProfilePress() {
    if (onPress) {
      onPress()
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
        query: followersQuery,
        variables: {
          profileId: id
        }
      })
      const profilesWithImage = response.data.followers.items.filter(p => p.wallet.defaultProfile.picture)
      let first3 = profilesWithImage.slice(0, 3)
      first3 = JSON.parse(JSON.stringify(first3))
      first3 = first3.map(profile => {
        profile.handle = profile.wallet.defaultProfile.handle
        profile.picture = returnIpfsPathOrUrl(profile.wallet.defaultProfile.picture.original.url)
        return profile
      })
      setFollowers(first3)
    } catch (err) {
      console.log('error fetching followers ...', err)
    }
  }

  async function fetchProfile() {
    if (!profileId && !ethereumAddress) {
      return console.log('please pass in either a Lens profile ID or an Ethereum address')
    }
    if (profileId) {
      try {
        const profileData = await client.query({
          query: profileById,
          variables: {
            profileId
          }
        })
        fetchFollowers(profileId)
        formatProfile(profileData.data.profile)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    } else {
      try {
        const profileData = await client.query({
          query: profileByAddress,
          variables: {
            address: ethereumAddress
          }
        })
        fetchFollowers(profileData.data.defaultProfile.id)
        formatProfile(profileData.data.defaultProfile)
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
    <div className={profileContainerStyle} onClick={onProfilePress}>
      <div style={styles.headerImageContainer}>
        <div>
          {
            profile.coverPicture?.__typename === 'MediaSet' ? (
              <div
                style={getHeaderImageStyle(profile?.coverPicture?.original?.url)}
              />
              ) : null
          }
          <div>
          {
            profile.picture?.__typename === 'MediaSet' ? (
              <div
                style={styles.profilePictureContainer}
              >
                <img
                  src={profile.picture.original.url}
                  style={styles.profilePicture}
                />
              </div>
              ) : null
          }
          </div>
        </div>
      </div>
      <div className={getProfileInfoContainerStyle()}>
        <div className={getButtonContainerStyle()}>
          <button style={getButtonStyle()}>Follow</button>
        </div>
        <div className={profileNameAndBioContainerStyle}>
          <p className={profileNameStyle}>{profile.name}</p>
          {
            profile.bio && (
              <p className={bioStyle} dangerouslySetInnerHTML={{
                __html: formatHandleColors(getSubstring(profile.bio))
              }} /> 
            )
          }
        </div>
        <div className={statsContainerStyle}>
          <p>
            {profile.stats.totalFollowing.toLocaleString('en-US')} <span>Following</span> 
          </p>
          <p>
            {profile.stats.totalFollowers.toLocaleString('en-US')} <span>Followers</span> 
          </p>
        </div>
        <div className={followedByContainerStyle}>
          <div className={miniAvatarContainerStyle}>
            {
              followers.map(follower => (
                <div key={follower.handle} className={getMiniAvatarWrapper()}>
                  <img src={follower.picture} className={getMiniAvatarStyle()} />
                </div>
              ))
            }
          </div>
          <p>
          <span>Followed by</span>
            {
            formatHandleList(followers.map(follower => follower.handle))
          }</p>
        </div>
      </div>
    </div>
  )
}

const system = css`
  font-family: ${systemFonts} !important
`

const profileNameAndBioContainerStyle = css`
  margin-top: 15px;
`

const profileNameStyle = css`
  font-size: 26px;
  font-weight: 700;
`

const bioStyle = css`
  font-weight: 500;
  margin-top: 9px;
  line-height: 24px;
`

function getProfileInfoContainerStyle() {
  return css`
    background-color: white;
    padding: 0px 20px 20px;
  `
}

const followedByContainerStyle = css`
  margin-top: 20px;
  display: flex;
  color: #464646;
  align-items: center;
  span {
    opacity: .5;
    margin-right: 4px;
  }
  p {
    margin-right: 5px;
    font-weight: 600;
    font-size: 14px;
  }
`

const statsContainerStyle = css`
  display: flex;
  margin-top: 15px;
  * {
    font-weight: 600;
  }
  p {
    margin-right: 10px;
  }
  span {
    color: #464646;
    opacity: 50%;
  }
`

const profileContainerStyle = css`
  width: 510px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
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

function getMiniAvatarStyle() {
  return css`
    width: 34px;
    height: 34px;
    border-radius: 20px;
    outline: 2px solid white;
    background-color: white;
  `  
}

function getButtonContainerStyle() {
  return css`
    display: flex;
    flex: 1;
    justify-content: flex-end;
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

function getHeaderImageStyle(url:string) {
  return {
    height: '245px',
    backgroundColor: ThemeColor.lightGreen,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${url})`,
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
  }
}

function getButtonStyle() {
  return {
    marginTop: '10px',
    outline: 'none',
    border: 'none',
    padding: '10px 30px',
    backgroundColor: '#3d4b41',
    borderRadius: '50px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500'
  }
}

const styles = {
  headerImageContainer: {
    position: 'relative' as 'relative'
  },
  profilePictureContainer: {
    position: 'absolute' as 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    bottom: -50,
    backgroundColor: 'white',
    width: '138px',
    height: '138px',
    borderRadius: '69px',
    marginLeft: '20px'
  },
  profilePicture: {
    width: '128px',
    height: '128px',
    borderRadius: '69px'
  },
  profileName: {
    fontSize: '28px',
    fontWeight: '500'
  }
}
