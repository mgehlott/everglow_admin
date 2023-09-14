import {IOccasion} from '../../../../types'
import {KTSVG, toAbsoluteUrl} from '../../../../_everglow/helpers'
const OccasionRow = ({title, _id, color, icon}: IOccasion) => {
  return (
    <tr>
      <td>
        <div className=''>
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light'>
              <img src={toAbsoluteUrl('/media/svg/avatars/001-boy.svg')} className='h-100' alt='' />
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className='text-dark fw-bold  d-block mb-1 fs-6'>{title.toUpperCase()}</div>
      </td>
      <td>
        <div className='h-100px w-100px ' style={{backgroundColor: color}}></div>
      </td>
      <td>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
      </td>
    </tr>
  )
}
export default OccasionRow
