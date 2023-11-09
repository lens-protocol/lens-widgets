export const getFollowers = `
  query followers($profileId: ProfileId!) {
    followers(request: {
      of: $profileId,
      limit: TwentyFive
    }) {
      items {
        handle {
          id
          fullHandle
          namespace
          localName
        }
        metadata {
          picture {
            ... on ImageSet {
              optimized {
                uri
              }
            }
            ... on NftImage {
              image {
                optimized {
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`