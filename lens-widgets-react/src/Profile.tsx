import { useEffect, useState } from 'react'
import { Profile } from './types'
import { client } from './graphql/client'
import { profileById, profileByAddress } from './graphql'
import { formatProfilePicture } from './utils'

export function Profile({
  profileId,
  ethereumAddress,
} : {
  profileId?: string,
  ethereumAddress?: string,
}) {
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile | undefined>()

  useEffect(() => {
    fetchProfile()
  }, [profileId])

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
  console.log('profile: ', profile)
  return (
    <div style={styles.profileContainer}>
      <div style={styles.headerImageContainer}>
        <div>
          {
            profile.coverPicture?.__typename === 'MediaSet' ? (
              <div
                style={getHeaderImageStyle(profile?.coverPicture?.original?.url)}
              />
              ) : null
          }
          <div style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'flex-end'
          }}>
            <button style={getButtonStyle()}>Follow</button>
          </div>
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
      <div style={styles.profileInfoContainer}>
        <div>
          <p style={styles.profileName}>{profile.name}</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  profileContainer: {
    width: '510px'
  },
  headerImageContainer: {
    position: 'relative' as 'relative'
  },
  profilePictureContainer: {
    position: 'absolute' as 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-115px',
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
  profileInfoContainer: {
    padding: '10px 20px 20px',
    marginTop: '40px'
  },
  profileName: {
    fontSize: '28px',
    fontWeight: '500'
  }
}

function getHeaderImageStyle(url:string) {
  return {
    height: '320px',
    backgroundColor: 'red',
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
    marginRight: '20px',
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