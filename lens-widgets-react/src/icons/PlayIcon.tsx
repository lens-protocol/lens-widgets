import { ThemeColor } from '../types'
import { css } from '@emotion/css'

export function PlayIcon() {
  return (
    <svg className={iconStyle} width="25" height="27" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5178 5.96857C11.9212 6.20469 11.9212 6.79499 11.5178 7.03111L1.53353 12.8751C1.13012 13.1112 0.625869 12.816 0.625869 12.3438L0.62587 0.655875C0.62587 0.183635 1.13012 -0.111513 1.53353 0.124606L11.5178 5.96857Z" fill={ThemeColor.lightGray} />
    </svg>
  )
}

const iconStyle = css`
  margin-left: 5px;
`