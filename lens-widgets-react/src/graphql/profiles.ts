export const profiles = `
query Profiles(
  $address: EthereumAddress!
) {
  profiles(request: {
    ownedBy: [$address]
  }) {
    items {
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
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`