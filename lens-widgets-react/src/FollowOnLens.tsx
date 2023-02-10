import LensIcon from './LensIcon'
import { Theme, Size } from './types' 
import { getContainerStyle, getTextStyle } from './utils'

export function FollowOnLens({
  handle,
  theme = Theme.default,
  size = Size.medium,
  title
} : {
  handle: string,
  theme?: Theme,
  size?: Size,
  title?: string
}) {
  function navigate() {
    if (!handle.includes('.lens')) {
      handle = handle + '.lens'
    }
    const uri = `https://www.lensfrens.xyz/${handle.toLowerCase()}/follow`
    window.open(uri, '_newtab')
  }

  function handleWithoutLens() {
    if (handle.includes('.lens')) {
      handle = handle.split('.')[0]
    }
    return '@' + handle
  }

  if (!title) {
    title = `Follow ${handleWithoutLens()} on Lens`
  }

  return (
    <button onClick={navigate} style={getContainerStyle(theme, size)}>
      <LensIcon theme={theme} size={size} />
      <p style={getTextStyle(theme, size)}>{title}</p>
    </button>
  )
}