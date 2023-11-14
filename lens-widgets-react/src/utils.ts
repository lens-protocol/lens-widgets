import {
  Theme, Size, ThemeColor, Profile
} from './types'

export const backgroundColorMap: Record<Theme, ThemeColor> = {
  default: ThemeColor.darkGray,
  light: ThemeColor.lightGray,
  dark: ThemeColor.lightBlack,
  green: ThemeColor.green,
  mint: ThemeColor.mint,
  peach: ThemeColor.peach,
  lavender: ThemeColor.lavender,
  blonde: ThemeColor.blonde,
}

export const foregroundColorMap: Record<Theme, ThemeColor> = {
  default: ThemeColor.lightGray,
  light: ThemeColor.darkGray,
  dark: ThemeColor.lightGray,
  green: ThemeColor.mint,
  mint: ThemeColor.darkGray,
  peach: ThemeColor.darkGray,
  lavender: ThemeColor.darkGray,
  blonde: ThemeColor.darkGray
}

const sizeMap: Record<Size, string> = {
  small: '12px',
  medium: '16px',
  large: '18px',
}

export const dimensionsMap:Record<Size, Record<string, number>> = {
  small: { width: 25.5, height: 16.5 },
  medium: { width: 34, height: 22 },
  large: { width: 51, height: 33 }
}

export function getContainerStyle(theme: Theme, size: Size) {
  let appendedStyles = {
    backgroundColor: backgroundColorMap[theme],
    padding: '6px 13px 6px 9px'
  }
  if (size === Size.large) {
    appendedStyles.padding = '8px 18px 8px 13px'
  }
  if (size === Size.small) {
    appendedStyles.padding = '6px 13px 6px 9px'
  }
  return {
    ...styles.buttonContainer,
    ...appendedStyles
  }
}

export function getTextStyle(theme:Theme, size: Size) {
  let appendedStyles = {
    color: foregroundColorMap[theme],
    fontSize: sizeMap[size]
  }
  return {
    ...styles.text,
    ...appendedStyles
  }
}

export function returnIpfsPathOrUrl(uri: string, ipfsGateway: string = 'https://cloudflare-ipfs.com/ipfs/') {
  if (uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', ipfsGateway)
  } else if (uri.startsWith('ar://')) {
    return uri.replace('ar://', 'https://arweave.net/')
  } else {
    return uri
  }
}

export function formatProfilePictures(profiles: Profile[]) {
  return profiles.map(profile => {
    let { picture, coverPicture } = profile
    if (picture && picture.__typename === 'MediaSet') {
      if (picture.original) {
        picture.original.url = returnIpfsPathOrUrl(picture.original.url)
      }
    }
    if (picture && picture.__typename === 'NftImage') {
      if (picture.uri) {
        picture.uri = returnIpfsPathOrUrl(picture.uri)
      }
    }
    if (coverPicture && coverPicture.__typename === 'MediaSet') {
      if (coverPicture.original.url) {
        coverPicture.original.url = returnIpfsPathOrUrl(coverPicture.original.url)
      }
    }
    if (coverPicture && coverPicture.__typename === 'NftImage') {
      if (coverPicture.uri) {
        coverPicture.uri = returnIpfsPathOrUrl(coverPicture.uri)
      }
    }
    return profile
  })
}

export function formatProfilePicture(profile: Profile) {
  profile = JSON.parse(JSON.stringify(profile))
  let { picture, coverPicture } = profile
  if (picture && picture.__typename === 'MediaSet') {
    if (picture.original) {
      picture.original.url = returnIpfsPathOrUrl(picture.original.url)
    }
  }
  if (coverPicture && coverPicture.__typename === 'MediaSet') {
    if (coverPicture.original.url) {
      coverPicture.original.url = returnIpfsPathOrUrl(coverPicture.original.url)
    }
  }
  return profile
}

export function configureMirrorAndIpfsUrl(items: any[]) {
  return items.map(item => {
    if (item.profileSet) return item
    let { profile } = item
    if (item.__typename === 'Mirror') {
      if (item.mirrorOf) {
        item.originalProfile = profile
        item.stats = item.mirrorOf.stats
        profile = item.mirrorOf.profile
      }
    }
    if (profile.picture && profile.picture.__typename === 'MediaSet' && profile.picture.original) {
      const url = returnIpfsPathOrUrl(profile.picture.original.url)
      if (url) {
        profile.picture.original.url = url
      } else {
        profile.missingAvatar = true
      }
    } else {
      profile.missingAvatar = true
    }

    item.profile = profile
    item.profileSet = true
    return item
  })
}

export const systemFonts = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";'

const pastels = [
  '#F2C4DE',
  '#71B1D9',
  '#AED8F2',
  '#F2DEA2',
  '#F2CDC4',
  '#ABD3DB',
  '#C2E6DF',
  '#D1EBD8',
  '#E5F5DC',
  '#FFFFE1',
  '#F2D0D9',
  '#F2F2F2',
  '#B8C6D9',
  '#8596A6',
  '#F2D9D0',
  '#A9B5D9',
  '#F2A477',
  '#F29472',
  '#F2C4C4',
  '#F2F2F2'
]

export function getRandomColor() {
  return pastels[Math.floor(Math.random()*pastels.length)]
}

export function getSubstring(string, length = 130) {
  if (!string) return ''
  if (string.length <= length) {
    return string
  } else {
    return `${string.substring(0, length)}...`
  }
}

/* takes a string of text and returns the same text with HTML + styling to highlight the handles */
export function formatHandleColors(text:string) {
  let color = ThemeColor.lightGreen
  text = text.replaceAll('.lens', '')
  text = text.replace(/(https\S+)/g, `<span style="color: ${color};">$1</span>`)
  return text.replace(/@(\w+)/g, `<span style="color: ${color};">@$1</span>`)
}

/* takes an array of handles, returns a commma separated string */
export function formatHandleList(handles) {
  handles = handles.join(', ')
  handles = handles.replaceAll('.lens', '')
  return handles
}

const styles = {
  buttonContainer: {
    outline: 'none',
    border: 'none',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  text: {
    margin: '0px 0px 0px 6px',
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }
}
