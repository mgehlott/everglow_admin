import {FC, useEffect, useState} from 'react'
import {OccasionsTable} from './OccasionsTable'
import {IOccasion} from '../../../../types'
import ApiCallService from '../../../../api/apiCallService'
import {GETOCCASIONS} from '../../../../api/apiEndPoints'
const Occasions: FC = () => {
  const [occasions, setOccasions] = useState<Array<IOccasion>>([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    console.log('effect')
    ;(() => getOccasions())()
  }, [page])
  const getOccasions = async () => {
    try {
      const apiService = new ApiCallService(GETOCCASIONS, {
        page: page,
        limit: 6,
      })
      const response = await apiService.callAPI()
      if (response) {
        console.log('occasions', response)
        setOccasions(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <OccasionsTable className='mb-5 mb-xl-8' page={page} occasions={occasions} setPage={setPage} />
  )
}
export default Occasions
