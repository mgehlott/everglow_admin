import {FC, useState} from 'react'
import {INewsFeed} from '../../../../types'
import {KTCardBody, KTSVG} from '../../../../_everglow/helpers'
import ApiCallService from '../../../../api/apiCallService'
import {DELETE_NEWSFEED} from '../../../../api/apiEndPoints'
import EditModal from './EditModal'
import {Button, Modal} from 'react-bootstrap'
import Loader from '../../../../_everglow/partials/layout/Loader'
import {showToast} from '../../../../utils/tool'
type Props = {
  row: INewsFeed
  setData: React.Dispatch<React.SetStateAction<INewsFeed[]>>
}
const Actions = ({row, setData}: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const deleteHandler = async (row: INewsFeed) => {
    setIsLoading(true)
    try {
      const appService = new ApiCallService(DELETE_NEWSFEED, `${row._id}`)
      const response = await appService.callAPI()
      if (response) {
        console.log('deleted')
        showToast('SUCCESS', 'NewsFeed Deleted !!')
        setShow(false)
        setData((preData) => preData.filter((item) => item._id !== row._id))
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const editHandler = () => {
    setIsEditModalOpen(true)
  }
  return (
    <>
      <div className='d-flex justify-content-between  align-items-center'>
        <div onClick={editHandler}>
          <span className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </span>
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
          <Modal.Title className='fs-2'>Delete NewsFeed</Modal.Title>
        </Modal.Header>
        {!isLoading ? (
          <>
            <Modal.Body className='mx-auto fs-3'>
              Are you sure to delete newfeed from app ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShow(false)}>
                No
              </Button>
              <Button variant='danger' onClick={() => deleteHandler(row)}>
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
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        row={row}
      />
    </>
  )
}
export default Actions
