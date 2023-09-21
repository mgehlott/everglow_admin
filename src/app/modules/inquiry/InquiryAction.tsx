import {ICampaign, IComment, IMessage} from '../../../types/response_data/response'
import {DELETE_MESSAGE} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import {KTSVG} from '../../../_everglow/helpers'
import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
type Props = {
  row: IMessage
  setData: React.Dispatch<React.SetStateAction<IMessage[]>>
}
const InquiryAction = ({row, setData}: Props) => {
  const [show, setShow] = useState(false)

  const deleteHandler = async (row: IMessage) => {
    console.log('delete', row._id)
    try {
      const appService = new ApiCallService(DELETE_MESSAGE, row._id)
      const response = await appService.callAPI()
      console.log('res', response)
      if (response.status === 200) {
        console.log('deleted')
        setData((preData) => {
          return preData.filter((item) => item._id !== row._id)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='d-flex justify-content-between  align-items-center'>
        <div
          onClick={() => {
            console.log('inquiry delete', row)
          
            setShow(true)
          }}
        >
          <KTSVG
            path='/media/icons/duotune/general/gen027.svg'
            svgClassName='w-25px h-40px'
            className='  text-primary'
          />
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='fs-2'>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-auto fs-3'>Are you sure to delete user message ?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant='danger' onClick={() => deleteHandler(row)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default InquiryAction
