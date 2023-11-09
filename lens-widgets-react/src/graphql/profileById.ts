export const profileById = `
  query Profile(
    $profileId: ProfileId
  ) {
    profile(request: {
      forProfileId: $profileId
    }) {
      id
      stats {
        following
        followers
      }
      handle {
        id
        fullHandle
        namespace
        localName
      }
      metadata {
        displayName
        bio
        rawURI
        appId
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
        coverPicture {
          raw {
            uri
          }
          optimized {
            uri
          }
        }
      }
    }
  }
`