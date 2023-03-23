import {
  useEffect, useState
} from 'react'
import { css } from '@emotion/css'
import ReactMarkdown from 'react-markdown'
import { ThemeColor, Theme } from './types'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import {
  formatProfilePicture,
  systemFonts,
  formatHandleColors,
  returnIpfsPathOrUrl,
  formatHandleList,
  getSubstring
} from './utils'
import { client, getPublication } from './graphql'

export function Publication({
  publicationId,
  onClick,
  theme = Theme.default,
}: {
  publicationId: string,
  onClick?: () => void,
  theme?: Theme
}) {
  const [publication, setPublication] = useState<any>()
  useEffect(() => {
    fetchPublication()
  }, [publicationId])
  async function fetchPublication() {
    try {
      const { data } = await client
        .query(getPublication, {
          publicationId
        })
       .toPromise()
       console.log('data: ', data)
       setPublication(data.publication)
    } catch (err) {

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
  publication.profile = formatProfilePicture(publication.profile)
  const { profile } = publication

  const isDarkTheme = theme === Theme.dark
  const color = isDarkTheme ? ThemeColor.white : ThemeColor.darkGray
  const backgroundColor = isDarkTheme ? ThemeColor.lightBlack : ThemeColor.white
  const reactionBgColor = isDarkTheme ? ThemeColor.darkGray : ThemeColor.lightGray
  const reactionTextColor = isDarkTheme ? ThemeColor.lightGray : ThemeColor.darkGray
  return (
    <div
      className={publicationContainerStyle(backgroundColor)}
      onClick={onPublicationPress}
    >
      <div className={profileContainerStyle}>
        <div>
          {
            profile.picture?.original?.url ? (
              <img
                src={profile.picture?.original?.url}
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
          <p className={dateStyle}> {formatRelative(subDays(new Date(publication.createdAt), 3), new Date())}</p>
        </div>
      </div>
      <div>
        <ReactMarkdown
          className={markdownStyle(color)}
        >{getSubstring(publication.metadata.content, 339)}</ReactMarkdown>
      </div>
      <div className={reactionsContainerStyle}>
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <p>{publication.stats.totalAmountOfComments}</p>
        </div>
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <p>{publication.stats.totalAmountOfMirrors}</p>
        </div>
        <div className={reactionContainerStyle(reactionTextColor, reactionBgColor)}>
          <p>{publication.stats.totalAmountOfCollects}</p>
        </div>
      </div>
    </div>
  )
}

const markdownStyle = color => css`
  color: ${color};
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
  background-color: #dddddd;
`

const reactionsContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const reactionContainerStyle = (color, backgroundColor) => css`
  background-color: ${backgroundColor};
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  p {
    color: ${color};
    font-size: 14px;
    opacity: .75;
    margin: 0;
  }
`

const publicationContainerStyle = color => css`
  width: 510px;
  background-color: ${color};
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 18px;
  @media (max-width: 510px) {
    width: 100%
  }
  * {
    ${system};
  }
`

const dateStyle = css`
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

