import LensIcon from './LensIcon'
import { Theme, Size } from './types' 
import { getContainerStyle, getTextStyle } from './utils'

export function FollowOnLens({
  handle,
  theme = Theme.default,
  size = Size.medium,
  title,
  containerStyle,
  textStyle,
  icon,
  iconBackgroundColor,
  iconForegroundColor
} : {
  handle: string,
  theme?: Theme,
  size?: Size,
  title?: string,
  containerStyle?: any,
  textStyle?: any,
  icon?: any,
  iconBackgroundColor?: string,
  iconForegroundColor?: string
}) {
  function navigate() {
    let URI
    if (handle.includes('.lens')) {
      URI = `https://share.lens.xyz/u/${handle.toLowerCase()}`
    } else if (handle.includes('/')) {
      const parts = handle.split('/')
      URI = `https://share.lens.xyz/u/${parts[1].toLowerCase()}.${parts[0].toLowerCase()}`
    } else {
      URI = `https://share.lens.xyz/u/${handle.toLowerCase()}.lens`
    }
    console.log('URI: ', URI)
    window.open(URI, '_newtab')
  }

  function handleWithoutLens() {
    if (handle.includes('/')) {
      const parts = handle.split('/')
      return '@' + parts[1]
    }
    if (handle.includes('.lens')) {
      const parts = handle.split('.')
      return '@' + parts[0]
    }
    return handle

  }

  if (!title) {
    title = `Follow ${handleWithoutLens()} on Lens`
  }

  return (
    <button onClick={navigate} style={containerStyle || getContainerStyle(theme, size)}>
      { icon || (
        <LensIcon
          theme={theme}
          size={size}
          iconBackgroundColor={iconBackgroundColor}
          iconForegroundColor={iconForegroundColor}
        />
      ) }
      <p style={textStyle || getTextStyle(theme, size)}>{title}</p>
    </button>
  )
}