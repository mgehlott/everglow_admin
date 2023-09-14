/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_everglow/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_everglow/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
type Props = {
  id: ID
}
const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const deleteItem = () => {
    console.log('deleted')
  }
  const [isUserActive, setIsUserActive] = useState(true)
  return (
    <>
      <div className='d-flex justify-content-around  align-items-center'>
        <div className='form-check form-check-solid form-switch'>
          <input
            className='form-check-input w-40px h-15px'
            type='checkbox'
            id='useractive'
            checked={isUserActive}
            onChange={() => setIsUserActive(!isUserActive)}
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
    </>
  )
}
export {UserActionsCell}
