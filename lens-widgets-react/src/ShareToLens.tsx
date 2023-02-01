import LensIcon from './LensIcon'
import { ThemeColor, Theme } from './types' 

export function ShareToLens({
  content,
  url,
  via,
  hashtags,
  theme = Theme.default
} : {
  content: string,
  url?: string,
  via?: string,
  hashtags?: string,
  theme?: Theme
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
    <button onClick={navigate} style={getContainerStyles(theme)}>
      <LensIcon />
      <p style={styles.text}>Share to Lens</p>
    </button>
  )
}

function getContainerStyles(theme: Theme) {
  if (theme === Theme.default) {
    return {
      ...styles.buttonContainer,
      backgroundColor: ThemeColor.darkGray,
    }
  }
  if (theme=== Theme.dark) {
    return {
      ...styles.buttonContainer,
      backgroundColor: ThemeColor.lightGray,
    }
  }
  if (theme === Theme.green) {
    return {
      ...styles.buttonContainer,
      backgroundColor: ThemeColor.darkGreen,
    }
  }
}

function getButtonStyles(theme:Theme) {

}

const styles = {
  buttonContainer: {
    outline: 'none',
    border: 'none',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '6px 14px'
  },
  text: {
    color: '#DCDCDC',
    margin: '0px 0px 0px 8px',
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }
}