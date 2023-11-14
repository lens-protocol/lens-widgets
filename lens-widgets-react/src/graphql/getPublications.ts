export const getPublications = `
  query getPublications(
    $profileId: [ProfileId!]
  ) {
    publications(request: {
      limit: TwentyFive
      where: {
        from: $profileId,
        publicationTypes: [POST],
      }
    }) {
      items {
        ... on Post {
          id
          createdAt
          by {
            id
            stats {
              followers
              following
            }
            metadata {
              displayName
              bio
              picture {
                ...on ImageSet {
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
          stats {
            comments
            mirrors
            quotes
            reactions
          }
          metadata {
            ... on TextOnlyMetadataV3 {
              id
              rawURI
              appId
              content
            }
            ... on AudioMetadataV3 {
              id
              rawURI
              appId
              content
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                audio {
                  optimized {
                    uri
                  }
                }
              }
            }
            ... on VideoMetadataV3 {
              id
              rawURI
              appId
              content
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                video {
                  optimized {
                    uri
                  }
                }
              }
            }
            ... on ImageMetadataV3 {
              id
              content
              asset {
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
  }
`