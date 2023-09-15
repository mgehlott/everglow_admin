import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'
type Props = {
  className?: string
  path: string
  svgClassName?: string
  style?: React.CSSProperties
}
const KTSVG: React.FC<Props> = ({className = '', path, svgClassName = 'mh-50px', style = {}}) => {
  return (
    <span style={style} className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}
export {KTSVG}
