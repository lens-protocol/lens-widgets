import { Theme, Size, ThemeColor } from './types' 

const sizeMap: Record<Size, string> = {
  small: '12px',
  medium: '14px',
  large: '18px',
}

export const dimensionsMap:Record<Size, Record<string, number>> = {
  small: { width: 25.5, height: 16.5 },
  medium: { width: 34, height: 22 },
  large: { width: 51, height: 33 }
}

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

export function getContainerStyle(theme: Theme, size: Size) {
  let appendedStyles = `background-color: ${backgroundColorMap[theme]}; \n`
  if (size === Size.medium) {
    appendedStyles = `${appendedStyles} padding: 8px 13px 8px 9px;`
  }
  if (size === Size.large) {
    appendedStyles = `${appendedStyles} padding: 10px 18px 10px 13px;`
  }
  if (size === Size.small) {
    appendedStyles = `${appendedStyles} padding: 6px 13px 6px 9px;`
  }
  return appendedStyles
}

export function getTextStyle(theme:Theme, size: Size) {
  return `
    color: ${foregroundColorMap[theme]};
    font-size: ${sizeMap[size]};
  `
}