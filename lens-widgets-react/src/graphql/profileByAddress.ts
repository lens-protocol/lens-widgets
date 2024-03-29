export const profileByAddress = `
  query DefaultProfile(
    $address: EvmAddress!
  ) {
    defaultProfile(request: {
      for: $address
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
