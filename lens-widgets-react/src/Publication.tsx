import {
  useEffect, useState
} from 'react'
import { css } from '@emotion/css'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { ThemeColor, Theme } from './types'
import { formatDistance } from 'date-fns'
import {
  MessageIcon, MirrorIcon, CollectIcon, HeartIcon
} from './icons'
import {
  formatProfilePicture,
  systemFonts,
  returnIpfsPathOrUrl,
  getSubstring,
  formatHandleColors
} from './utils'
import { client, getPublication } from './graphql'
import ReactPlayer from 'react-player'
import { AudioPlayer } from './AudioPlayer'

export function Publication({
  publicationId,
  onClick,
  publicationData,
  theme = Theme.default,
  ipfsGateway,
}: {
  publicationId?: string,
  publicationData?: any,
  onClick?: () => void,
  theme?: Theme,
  ipfsGateway?: string
}) {
  let [publication, setPublication] = useState<any>()
  useEffect(() => {
    if (!publicationData) {
      fetchPublication()
    } else {
      setPublication(publicationData)
    }
  }, [publicationId])
  async function fetchPublication() {
    try {
      const { data } = await client
        .query(getPublication, {
          publicationId
        })
       .toPromise()
       setPublication(data.publication)
    } catch (err) {
      console.log('error fetching piublication: ', err)
    }
  }
  function onPublicationPress() {
    if (onClick) {
      onClick()
    } else {
      const URI = `https://lenster.xyz/posts/${publicationId}`
      window.open(URI, '_blank')
    }
  }
  if (!publication) return null

  if (publication.mirrorOf) {
    const { mirrorOf, ...original} = publication
    publication = publication.mirrorOf
    publication.original = original
  }
  publication.profile = formatProfilePicture(publication.profile)
  const { profile } = publication

  const isDarkTheme = theme === Theme.dark
  const color = isDarkTheme ? ThemeColor.white : ThemeColor.darkGray
  const backgroundColor = isDarkTheme ? ThemeColor.lightBlack : ThemeColor.white
  const reactionBgColor = isDarkTheme ? ThemeColor.darkGray : ThemeColor.lightGray
  const reactionTextColor = isDarkTheme ? ThemeColor.lightGray : ThemeColor.darkGray

  let media, cover
  if (publication.metadata.media.length) {
    media = publication.metadata.media[0]
    if (media && media.original) {
      if (
        media.original.mimeType === 'image/jpg' ||
        media.original.mimeType === 'image/jpeg' ||
        media.original.mimeType === 'image/png' ||
        media.original.mimeType === 'image/gif'
      ) {
        media.type = 'image'
      }
      if (
        media.original.mimeType === 'video/mp4' ||
        media.original.mimeType === 'video/quicktime' ||
        media.original.mimeTuype === 'application/x-mpegURL' ||
        media.original.mimeType === 'video/MP2T'
      ) {
        media.type = 'video'
      }
      if (
        media.original.mimeType === 'audio/mpeg' ||
        media.original.mimeType === 'audio/wav' ||
        media.original.mimeType === 'audio/mp3'
      ) {
        media.type = 'audio'
      }
      media.original.url = returnIpfsPathOrUrl(media.original.url, ipfsGateway)
    }
  }
  if (publication.metadata.cover) {
    cover = returnIpfsPathOrUrl(publication.metadata.cover.original.url, ipfsGateway)
  }

  return (
    <div
      className={publicationContainerStyle(backgroundColor)}
    >
      <div
       onClick={onPublicationPress}
       className={topLevelContentStyle}
      >
         {
            publication.original && (
              <div className={mirroredByContainerStyle}>
                <MirrorIcon color={ThemeColor.mediumGray} />
                <p>mirrored by {publication.original.profile.handle || publication.original.profile.name}</p>
              </div>
            )
          }
        <div className={profileContainerStyle}>
          <div>
            {
             profile.picture?.uri || profile.picture?.original?.url ? (
                <img
                  src={
                    profile.picture.__typename === 'NftImage' ?
                    profile.picture.uri : profile.picture?.original?.url
                  }
                  className={profilePictureStyle}
                />
              ) : (
                <div
                  className={profilePictureStyle}
                />
              )
            }
          </div>
          <div className={profileDetailsContainerStyle(color)}>
            <p className={profileNameStyle}>{profile.name || profile.handle}</p>
            <p className={dateStyle}> {formatDistance(new Date(publication.createdAt), new Date())}</p>
          </div>
        </div>
        <div>
          <ReactMarkdown
            className={markdownStyle(color)}
            rehypePlugins={[rehypeRaw]}
          >{formatHandleColors(getSubstring(publication.metadata.content, 339))}</ReactMarkdown>
        </div>
      </div>
      {
        media && media.type == 'image' && (
          <div className={imageContainerStyle}>
            <img
              className={mediaImageStyle}
              src={media.original.url}
              onClick={onPublicationPress}
            />
          </div>
        )
      }
      {
        media && media.type == 'video' && (
          <div className={videoContainerStyle}>
            <ReactPlayer
              className={videoStyle}
              url={media.original.url}
              controls
            />
          </div>
        )
      }
      {
        media && media.type == 'audio' && (
          <AudioPlayer
            url={media.original.url}
            theme={theme}
            cover={cover}
            publication={publication}
          />
        )
      }
      <div
        className={reactionsContainerStyle}
        onClick={onPublicationPress}
      >
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <MessageIcon color={reactionTextColor} />
          <p>{publication.stats.totalAmountOfComments}</p>
        </div>
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <MirrorIcon color={reactionTextColor} />
          <p>{publication.stats.totalAmountOfMirrors}</p>
        </div>
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <HeartIcon color={reactionTextColor} />
          <p>{publication.stats.totalUpvotes}</p>
        </div>
        {
          publication.stats.totalAmountOfCollects > Number(0) && (
            <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
              <CollectIcon color={reactionTextColor} />
              <p>{publication.stats.totalAmountOfCollects}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

const topLevelContentStyle = css`
  padding: 12px 18px 0px;
`

const imageContainerStyle = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  max-height: 480px;
`

const videoContainerStyle = css`
  padding-top: 56.25% !important;
  height: 0px !important;
  position: relative !important;
`

const videoStyle = css`
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
`

const mediaImageStyle = css`
  width: 100%;
  height: auto;
  display: block;
`

const markdownStyle = color => css`
  color: ${color};
  overflow: hidden;
  p {
    font-size: 14px;
  }
`

const profileContainerStyle = css`
  display: flex;
  align-items: center;
`
const system = css`
  font-family: ${systemFonts} !important
`

const profileNameStyle = css`
  font-weight: 600;
  font-size: 16px;
`

const profilePictureStyle = css`
  width: 42px;
  height: 42px;
  border-radius: 20px;
  object-fit: cover;
  background-color: #dddddd;
`

const reactionsContainerStyle = css`
  padding: 0px 18px 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
`

const mirroredByContainerStyle = css`
  display: flex;
  margin-bottom: 5px;
  height: 30px;
  align-items: center;
  p {
    margin: 0;
    color: ${ThemeColor.mediumGray};
    font-size: 14px;
    margin-left: 10px;
    margin-top: -2px;
  }
`

const reactionContainerStyle = (color, backgroundColor) => css`
  background-color: ${backgroundColor};
  display: flex;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  p {
    color: ${color};
    font-size: 12px;
    opacity: .75;
    margin: 0;
    margin-left: 4px;
  }
`

const publicationContainerStyle = color => css`
  width: 510px;
  background-color: ${color};
  cursor: pointer;
  border-radius: 18px;
  @media (max-width: 510px) {
    width: 100%
  }
  * {
    ${system};
  }
`

const dateStyle = css`
  margin-top: 2px !important;
  font-size: 12px;
  color: ${ThemeColor.darkGray};
  opacity: .75;
`

const profileDetailsContainerStyle = color => css`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
  p {
    margin: 0;
    color: ${color};
  }
`