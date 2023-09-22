import {useFormik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import TextEditor from './TextEditor'
import {useEffect, useState} from 'react'
import ApiCallService from '../../../../api/apiCallService'
import { GET_POLICY, UPDATE_POLICY} from '../../../../api/apiEndPoints'
import Loader from '../../../../_everglow/partials/layout/Loader'
const PrivacyPolicy = () => {
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    ;(() => fetchText())()
  }, [])
  const fetchText = async () => {
    setIsLoading(true)
    const apiService = new ApiCallService(GET_POLICY)
    try {
      const response = await apiService.callAPI()
      setData(response.result)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    updateText()
  }
  const updateText = async () => {
    setIsLoading(true)
    const apiService = new ApiCallService(UPDATE_POLICY, {data: data})
    try {
      const response = await apiService.callAPI()
      if (response) {
        console.log('about', response)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <KTCard>
      <div className='card-header mt-4' style={{display: 'block'}}>
        <div className='row mb-4'>
          <div className='card-title col-lg'>
            <h3 className='card-label'>Privacy Policy</h3>
          </div>
        </div>
      </div>
      {isLoading === false ? (
        <KTCardBody className='py-4'>
          <form className='form' onSubmit={onSubmit}>
            {/* begin::Scroll */}
            <div
              className='d-flex flex-column scroll-y me-n7 pe-7'
              id='kt_modal_add_user_scroll'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_modal_add_user_header'
              data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
              data-kt-scroll-offset='300px'
            ></div>
            <TextEditor data={data} setData={setData} />
            <div className=' pt-15'>
              <button type='submit' className='btn btn-primary' data-kt-users-modal-action='submit'>
                <span className='indicator-label'>Update</span>
              </button>
            </div>
          </form>
        </KTCardBody>
      ) : (
        <KTCardBody className='d-flex justify-content-center align-items-center'>
          <Loader />
        </KTCardBody>
      )}
    </KTCard>
  )
}
export default PrivacyPolicy
