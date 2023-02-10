import { useEffect, useState } from 'react'
import { Profile } from './types'
import { client } from './graphql/client'
import { profileById, profileByAddress } from './graphql'

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
        console.log('profileData: ', profileData)
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
        console.log('profileData: ', profileData)
      } catch (err) {
        console.log('error fetching profile... ', err)
      }
    }
  }
  if (!profile) return null
  return (
    <div>
      <div style={styles.headerImageContainer}>
        <h1>Hello World</h1>
      </div>
    </div>
  )
}

const styles = {
  headerImageContainer: {},
  headerImage: {}
}