import { ThemeColor } from '../types'
import { css } from '@emotion/css'

export function PauseIcon() {
  return (
    <svg className={iconStyle} version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd" fill={ThemeColor.lightGray}>
        <path d="m733.88 24.086h408.03v1153.2h-408.03z"/>
        <path d="m58.086 24.086h408.03v1153.2h-408.03z"/>
      </g>
    </svg>
  )
}

const iconStyle = css`
  height: 30px;
  margin-left: -1px;
`