import {useFormik} from 'formik'
import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import TextEditor from '../../newsfeed/components/TextEditor'
const AboutUs = () => {
  return (
    <KTCard>
      <div className='card-header mt-4' style={{display: 'block'}}>
        <div className='row mb-4'>
          <div className='card-title col-lg'>
            <h3 className='card-label'>About us</h3>
          </div>
        </div>
      </div>
      <KTCardBody className='py-4'>
        <form className='form'>
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
          {/* end::Scroll */}
          <TextEditor />
          {/* begin::Actions */}
          <div className=' pt-15'>
            <button
              type='submit'
              className='btn btn-primary'
              data-kt-users-modal-action='submit'
              // disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              <span className='indicator-label'>Submit</span>
            </button>
          </div>
          {/* end::Actions */}
        </form>
      </KTCardBody>
    </KTCard>
  )
}
export default AboutUs
