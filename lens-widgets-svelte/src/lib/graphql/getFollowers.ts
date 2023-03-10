import { gql } from '@apollo/client/core'

export const getFollowers = gql`
  query getFollowers($profileId: ProfileId!) {
    followers(request: {
      profileId: $profileId,
      limit: 30
    }) {
      items {
        wallet {
          defaultProfile {
            handle
            picture {
              ...on MediaSet {
                original {
                  url
                } 
              }
            }
          }
        }
      }
    }
  }
`