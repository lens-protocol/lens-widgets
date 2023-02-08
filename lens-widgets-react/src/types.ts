export enum Theme {
  default = 'default',
  light = 'light',
  mint = 'mint',
  green = 'green',
  peach = 'peach',
  lavender = 'lavender',
  blonde = 'blonde'
}

export enum ThemeColor {
  lightGray = '#dcdcdc',
  darkGray = '#464646',
  mint = '#bce0c7',
  green = '#364239',
  peach = '#f5d4d2',
  lavender = '#dbccf3',
  blonde = '#ffebB8'
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}