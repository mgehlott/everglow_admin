/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_everglow/helpers'
import {IOccasion} from '../../../../types'
import OccasionRow from './OccasionRow'
type Props = {
  className: string
  page: number
  occasions: Array<IOccasion>
  setPage: React.Dispatch<React.SetStateAction<number>>
}
const OccasionsTable: React.FC<Props> = ({className, page, occasions, setPage}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>View Occasions</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-150px rounded-start'>Occasion Image</th>
                <th className='min-w-125px'>Occasion Name</th>
                <th className='min-w-200px'>Occasion Color</th>
                <th className='min-w-100px'>Action</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {occasions.map((item: IOccasion) => (
                <OccasionRow key={item._id} _id={item._id} color={item.color} title={item.title} />
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}
export {OccasionsTable}
