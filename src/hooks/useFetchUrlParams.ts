import {useEffect, useState} from 'react'
import ApiCallService from '../api/apiCallService'
import {boolean} from 'yup'
function useFetchUrlParams<T>(apiName: string, page: number, limit: number): [T[], boolean] {
  const [data, setData] = useState<Array<T>>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    ;(() => {
      fethData()
    })()
  }, [page])
  const fethData = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  }
  return [data, isLoading]
}
export default useFetchUrlParams
