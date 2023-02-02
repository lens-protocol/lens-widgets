import LensIcon from './LensIcon'
import { Theme, Size } from './types' 
import { getContainerStyle, getTextStyle } from './utils'

export function FollowOnLens({
  handle,
  theme = Theme.default,
  size = Size.medium
} : {
  handle: string,
  theme?: Theme,
  size?: Size
}) {
  function navigate() {
    if (!handle.includes('.lens')) {
      handle = handle + '.lens'
    }
    const uri = `https://www.lensfrens.xyz/${handle.toLowerCase()}/follow`
    window.open(uri, '_newtab')
  }

  return (
    <button onClick={navigate} style={getContainerStyle(theme, size)}>
      <LensIcon theme={theme} size={size} />
      <p style={getTextStyle(theme, size)}>Follow On Lens</p>
    </button>
  )
}