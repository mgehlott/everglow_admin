import {ICampaign, IComment} from '../../../types/response_data/response'
import {DELETE_CAMPAIGN, DELETE_COMMENT} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import {KTCardBody, KTSVG} from '../../../_everglow/helpers'
import {DELETE_ID_PARAMS_BODY} from '../../../utils/constants'
import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import Loader from '../../../_everglow/partials/layout/Loader'
import {showToast} from '../../../utils/tool'
type Props = {
  row: IComment
  setData: React.Dispatch<React.SetStateAction<IComment[]>>
}
const CommentAction = ({row, setData}: Props) => {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const deleteHandler = async (row: IComment) => {
    console.log('delete', row._id)
    setIsLoading(true)
    try {
      const appService = new ApiCallService(
        DELETE_COMMENT,
        {
          campaignId: row.campaignId,
        },
        `${row._id}`
      )
      const response = await appService.callAPI()
      console.log('res', response)
      if (response) {
        console.log('deleted')
        showToast('SUCCESS', 'Comment is deleted')
        setData((preData) => {
          return preData.filter((item) => item._id !== row._id)
        })
      }
    } catch (error) {
      console.log(error)
      showToast('ERROR', 'Something went wrong,Try again later')
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className='d-flex justify-content-between  align-items-center'>
        <div
          onClick={() => {
            console.log('row', row)
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
export default CommentAction
