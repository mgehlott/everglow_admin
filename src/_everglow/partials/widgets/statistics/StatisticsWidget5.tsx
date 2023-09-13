/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'
import {Link} from 'react-router-dom'
type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string
  to?: string
}
const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
  to,
}) => {
  return (
    <Link to={to || '#'} className={`card bg-${color} hoverable ${className}`}>
      <div className='card-body'>
        <div className='d-flex align-items-center gap-3'>
          <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />
          <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5 mr-5`}>{description}</div>
        </div>
        <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5 `}>{title}</div>
      </div>
    </Link>
  )
}
export {StatisticsWidget5}
