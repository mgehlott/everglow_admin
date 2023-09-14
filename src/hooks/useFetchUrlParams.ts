import {useEffect, useState} from 'react'
import ApiCallService from '../api/apiCallService'
function useFetchUrlParams<T>(apiName: string, page: number, limit: number): T[] {
  const [data, setData] = useState<Array<T>>([])
  useEffect(() => {
    ;(() => {
      fethData()
    })()
  }, [page])
  const fethData = async () => {
    try {
      const apiService = new ApiCallService(apiName, {
        page: page,
        limit: limit,
      })
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return data
}
export default useFetchUrlParams
