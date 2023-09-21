import {ICampaign, IComment} from '../../../types/response_data/response'
import {DELETE_CAMPAIGN, DELETE_COMMENT} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import {KTSVG} from '../../../_everglow/helpers'
import {DELETE_ID_PARAMS_BODY} from '../../../utils/constants'
type Props = {
  row: IComment
}
const CommentAction = ({row}: Props) => {
  console.log('cmt row', row)
  const deleteHandler = async (row: IComment) => {
    console.log('delete', row._id)
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
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='d-flex justify-content-between  align-items-center'>
      <div
        onClick={() => {
          console.log('row', row)
          deleteHandler(row)
        }}
      >
        <KTSVG
          path='/media/icons/duotune/general/gen027.svg'
          svgClassName='w-25px h-40px'
          className='  text-primary'
        />
      </div>
    </div>
  )
}
export default CommentAction
