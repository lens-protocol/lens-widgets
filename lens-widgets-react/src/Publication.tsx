import {
  useEffect, useState
} from 'react'
import { css } from '@emotion/css'
import { ThemeColor, Theme } from './types'
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
  if (!publication) return null
  console.log('publication set: ', publication)
  return (
    <div className={publicationContainerClass}>
      <p>{publication.metadata.content}</p>
    </div>
  )
}

const system = css`
  font-family: ${systemFonts} !important
`

const publicationContainerClass = css`
  width: 510px;
  @media (max-width: 510px) {
    width: 100%
  }
  * {
    ${system};
  }
`