import {
  useState
} from 'react'
import ReactPlayer from 'react-player'
import { ThemeColor, Theme } from './types'
import { css } from '@emotion/css'
import { PlayIcon, PauseIcon } from './icons'
import { getSubstring } from './utils'

export function AudioPlayer({
  publication,
  url,
  cover,
  theme
}) {
  const isDarkTheme = theme === Theme.dark
  const audioPlayerBg = isDarkTheme ? '#3f3f3f' : ThemeColor.lightGray
  const fontTitleColor = isDarkTheme ? '#ffffff' : ThemeColor.lightBlack
  const fontTrackColor = isDarkTheme ? 'rgba(220, 220, 220, .5)' : `rgba(70, 70, 70, .75)`
  const playIconBgColor = isDarkTheme ? 'rgba(255, 255, 255, .25)' : `rgba(70, 70, 70, .75)`
  const [isPlaying, setIsPlaying] = useState(false)

  function updateIsPlaying() {
    setIsPlaying(!isPlaying)
  }

  const { profile } = publication

  return (
   <div>
     <ReactPlayer
      url={url}
      playing={isPlaying}
      className={playerStyle}
    />
    <div
      className={controlsStyle(audioPlayerBg)}
      onClick={updateIsPlaying}
    >
      <div className={coverImageContainerStyle}>
        {
          cover ? (
            <img
              src={cover}
              className={audioImaveStyle}
            />
          ) : (
            <div />
          )
        }
      </div>
      <div className={audioMetadataContainerStyle}>
        <p className={audioMetadataArtistStyle(fontTitleColor)}>{profile.name}</p>
        <p className={audioMetadataTrackStyle(fontTrackColor)}>{getSubstring(publication?.metadata?.name, 30)}</p>
      </div>
      <div className={playIconWrapperStyle}>
        <div
          className={playIconContainerStyle(playIconBgColor)}
        > 
          {
            isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )
          }
        </div>
      </div>
    </div>
   </div>
  )
}

const playIconWrapperStyle = css`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-left: 5px;
  padding-right: 30px;
  @media (max-width: 420px) {
    padding-right: 15px;
  }
`

const audioMetadataContainerStyle = css`
  padding: 10px;
`

function audioMetadataArtistStyle(color) {
  return css`
    font-size: 22px;
    font-weight: 700;
    margin: 0px;
    color: ${color};
  `
}

function audioMetadataTrackStyle(color) {
  return css`
    font-size: 14px;
    margin: 0;
    color: ${color};
  `
}

const coverImageContainerStyle = css`
  padding: 10px;
  position: relative;
`

const audioImaveStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 6px;
`

function playIconContainerStyle(bgColor) {
  return css`
  background-color: ${bgColor};
  border-radius: 50px;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity .25s;
  &:hover {
    opacity: .9;
  }
`
}

function controlsStyle (bgColor) {
  return css`
  height: 140px;
  background-color: ${bgColor};
  display: flex;
  align-items: center;
`
}

const playerStyle = css`
  height: 0 !important;
  width: 0 !important;
`