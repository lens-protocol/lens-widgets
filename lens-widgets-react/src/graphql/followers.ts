import { gql } from '@apollo/client'

export const followers = gql`
  query followers($profileId: ProfileId!) {
    followers(request: {
      profileId: $profileId,
      limit: 10
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