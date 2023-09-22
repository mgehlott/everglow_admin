import {useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../_everglow/helpers'
import ApiCallService from '../../../../api/apiCallService'
import {DEACTIVATE_USER, DELETE_USER} from '../../../../api/apiEndPoints'
import {Button, Form, Modal} from 'react-bootstrap'
import {showToast} from '../../../../utils/tool'
import Loader from '../../../../_everglow/partials/layout/Loader'
type Props = {
  isActive: boolean
  _id: string
}
const UserActions = (props: Props) => {
  const [isActive, setIsActive] = useState(props.isActive)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const changeHandler = () => {
    console.log('change')
    setIsActive(!isActive)
    deactivateUser()
  }
  const deactivateUser = async () => {
    try {
      const apiService = new ApiCallService(DEACTIVATE_USER, {}, {_id: props._id})
      const response = await apiService.callAPI()
      console.log(response)
      if (response.status === 200) {
        console.log('change user')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deleteUser = async () => {
    setIsLoading(true)
    try {
      const apiService = new ApiCallService(DELETE_USER, {}, {_id: props._id})
      const response = await apiService.callAPI()
      if (response) {
        console.log(response)
        showToast('SUCCESS', 'User Deleted !!')
        setShow(false)
      }
    } catch (error) {
      showToast('ERROR', 'Something went wrong , Try again later')
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className='d-flex justify-content-around align-items-center   w-100'>
        <div className='form-check  form-switch mt-3'>
          <input
            className='form-check-input'
            style={{height:'17px',width:'35px'}}
            type='checkbox'
            id='useractive'
            checked={isActive}
            onChange={changeHandler}
          />
          <label className='form-check-label' htmlFor='useractive'></label>
        </div>
        {/* <Form.Switch  checked={isActive} onChange={changeHandler} /> */}
        <div onClick={() => setShow(true)}>
          <KTSVG
            path='/media/icons/duotune/general/gen027.svg'
            svgClassName='w-25px h-60px'
            className='  text-primary'
          />
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='fs-2'>Delete User</Modal.Title>
        </Modal.Header>
        {isLoading === false ? (
          <>
            {' '}
            <Modal.Body className='mx-auto fs-3'>Are you sure to delete user from app ?</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShow(false)}>
                No
              </Button>
              <Button variant='danger' onClick={() => deleteUser()}>
                Delete
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <KTCardBody className='d-flex justify-content-center align-items-center'>
            <Loader />
          </KTCardBody>
        )}
      </Modal>
    </>
  )
}
export default UserActions
