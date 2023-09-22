import {ICampaign} from '../../../types/response_data/response'
import {DELETE_CAMPAIGN} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import {KTCardBody, KTSVG} from '../../../_everglow/helpers'
import {useState} from 'react'
import {Button, Modal, Spinner} from 'react-bootstrap'
import Loader from '../../../_everglow/partials/layout/Loader'
import {showToast} from '../../../utils/tool'
type Props = {
  row: ICampaign
  modalOpenHandler: () => void
  setCurrRow: (row: ICampaign) => void
  setData: React.Dispatch<React.SetStateAction<ICampaign[]>>
}
const CampaignActions = ({row, modalOpenHandler, setCurrRow, setData}: Props) => {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isViewLoading, setIsViewLoading] = useState(false)
  const deleteHandler = async (row: ICampaign) => {
    console.log('delete', row._id, row.title)
    setIsLoading(true)
    try {
      const appService = new ApiCallService(DELETE_CAMPAIGN, `${row._id}`)
      const response = await appService.callAPI()
      if (response) {
        console.log('deleted')
        setData((prevData) => {
          return prevData.filter((item) => item._id !== row._id)
        })
        showToast('SUCCESS', 'Campaign Deleted')
      }
    } catch (error) {
      console.log(error)
      showToast('ERROR', 'Something went wrong ,Try again later')
    }
    setIsLoading(false)
    setShow(false)
  }
  const editHandler = (row: ICampaign): void => {
    setIsViewLoading(true)
    setTimeout(() => {
      setIsViewLoading(false)
      modalOpenHandler()
    }, 500)
    setCurrRow(row)
    console.log('edit')
  }
  return (
    <>
      <div className='d-flex  align-items-center w-50 gap-4 '>
        <div className='me-1 ml-3'>
          {isViewLoading === false ? (
            <div onClick={() => editHandler(row)}>
              <span>
                <i className='bi bi-eye-fill' style={{fontSize: '1.8rem', color: '#009ef7'}}></i>
              </span>
            </div>
          ) : (
            <Spinner animation='border' role='status' style={{width: '18px', height: '18px'}} />
          )}
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
        {!isLoading ? (
          <>
            <Modal.Body className='mx-auto fs-3'>
              Are you sure to delete campaign from app ?
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
    </>
  )
}
export default CampaignActions
