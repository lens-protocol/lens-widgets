import LensIcon from './LensIcon'
import { Theme, Size } from './types' 
import { getContainerStyle, getTextStyle } from './utils'

export function ShareToLens({
  content,
  url,
  via,
  hashtags,
  theme = Theme.default,
  size = Size.medium,
  title = 'Share to Lens'
} : {
  content: string,
  url?: string,
  via?: string,
  hashtags?: string,
  theme?: Theme,
  size?: Size,
  title?: string
}) {
  function navigate() {
    let shareUrl = `https://lenster.xyz/?text=${encodeURIComponent(content)}`
    if (url) {
      shareUrl = shareUrl + `&url=${url}`
    }
    if (via) {
      shareUrl = shareUrl + `&via=${encodeURIComponent(via)}`
    }
    if (hashtags) {
      shareUrl = shareUrl + `&hashtags=${hashtags}`
    }
    window.open(shareUrl, '_newtab')
  }

  return (
    <button onClick={navigate} style={getContainerStyle(theme, size)}>
      <LensIcon theme={theme} size={size} />
      <p style={getTextStyle(theme, size)}>{title}</p>
    </button>
  )
}