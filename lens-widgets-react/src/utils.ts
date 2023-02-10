import {
  Theme, Size, ThemeColor
} from './types'

export const backgroundColorMap: Record<Theme, ThemeColor> = {
  default: ThemeColor.darkGray,
  light: ThemeColor.lightGray,
  green: ThemeColor.green,
  mint: ThemeColor.mint,
  peach: ThemeColor.peach,
  lavender: ThemeColor.lavender,
  blonde: ThemeColor.blonde
}

export const foregroundColorMap: Record<Theme, ThemeColor> = {
  default: ThemeColor.lightGray,
  light: ThemeColor.darkGray,
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
