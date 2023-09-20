import {KTSVG} from '../../../../_everglow/helpers'
const UserActions = () => {
  return (
    <div className='d-flex justify-content-around align-items-end  w-100'>
      <div className='form-check form-check-solid form-switch my-auto '>
        <input
          className='form-check-input w-40px h-15px'
          type='checkbox'
          id='useractive'
          checked={true}
        />
        <label className='form-check-label' htmlFor='useractive'></label>
      </div>
      <div>
        <KTSVG
          path='/media/icons/duotune/general/gen027.svg'
          svgClassName='w-25px h-40px'
          className='  text-primary'
        />
      </div>
    </div>
  )
}
export default UserActions
