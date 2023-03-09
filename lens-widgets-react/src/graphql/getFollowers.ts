export const getFollowers = `
  query followers($profileId: ProfileId!) {
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