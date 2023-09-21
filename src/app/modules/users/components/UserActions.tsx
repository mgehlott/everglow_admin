import {useState} from 'react'
import {KTSVG} from '../../../../_everglow/helpers'
import ApiCallService from '../../../../api/apiCallService'
import {DEACTIVATE_USER} from '../../../../api/apiEndPoints'
import {Button, Modal} from 'react-bootstrap'
type Props = {
  isActive: boolean
  _id: string
}
const UserActions = (props: Props) => {
  const [isActive, setIsActive] = useState(props.isActive)
  const [show, setShow] = useState(false)
  const changeHandler = () => {
    console.log('change')
    setIsActive(!isActive)
    deactivateUser()
  }
  const deactivateUser = async () => {
    try {
      const apiService = await new ApiCallService(DEACTIVATE_USER, {}, {_id: props._id})
      const response = await apiService.callAPI()
      console.log(response)
      if (response.status === 200) {
        console.log('change user')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='d-flex justify-content-around align-items-end  w-100'>
        <div className='form-check form-check-solid form-switch my-auto '>
          <input
            className='form-check-input w-40px h-15px'
            type='checkbox'
            id='useractive'
            checked={isActive}
            onChange={changeHandler}
          />
          <label className='form-check-label' htmlFor='useractive'></label>
        </div>
        <div onClick={() => setShow(true)}>
          <KTSVG
            path='/media/icons/duotune/general/gen027.svg'
            svgClassName='w-25px h-40px'
            className='  text-primary'
          />
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='fs-2'>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-auto fs-3'>Are you sure to delete user for app ?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant='danger' onClick={() => setShow(false)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UserActions
