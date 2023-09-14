import {FC} from 'react'
import {INewsFeed} from '../../../../../types'
import {KTSVG} from '../../../../../_everglow/helpers'
type Props = {
  row: INewsFeed
}
const Actions = ({row}: Props) => {
  console.log(row)
  const deleteHandler = (row: INewsFeed): void => {
    console.log('delete', row.title)
  }
  const editHandler = (row: INewsFeed): void => {
    console.log('edit', row.title)
  }
  return (
    <div className='d-flex justify-content-around  align-items-center'>
      <div className='form-check form-check-solid form-switch' onClick={() => editHandler(row)}>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
        <label className='form-check-label' htmlFor='useractive'></label>
      </div>
      <div onClick={() => deleteHandler(row)}>
        <KTSVG
          path='/media/icons/duotune/general/gen027.svg'
          svgClassName='w-25px h-40px'
          className='  text-primary'
        />
      </div>
    </div>
  )
}
export default Actions
