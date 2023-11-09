export const profile = `
  query Profile(
    $handle: Handle!
  ) {
    profile(request: {
      forHandle: $handle
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