import {ICampaign} from '../../../types/response_data/response'
import {DELETE_CAMPAIGN} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import {KTSVG} from '../../../_everglow/helpers'
type Props = {
  row: ICampaign
}
const CampaignActions = ({row}: Props) => {
  console.log(row)
  const deleteHandler = async (row: ICampaign) => {
    console.log('delete', row._id, row.title)
    try {
      const appService = new ApiCallService(DELETE_CAMPAIGN, `${row._id}`)
      const response = await appService.callAPI()
      if (response) {
        console.log('deleted')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editHandler = (row: ICampaign): void => {
    console.log('edit', row.title)
  }
  return (
    <div className='d-flex justify-content-between  align-items-center'>
      <div onClick={() => editHandler(row)}>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
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
export default CampaignActions
