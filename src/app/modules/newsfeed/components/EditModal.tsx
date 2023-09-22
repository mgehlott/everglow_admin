import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {KTCardBody} from '../../../../_everglow/helpers'
import {useFormik} from 'formik'
import {FormValues, INewsFeed} from '../../../../types'
import * as Yup from 'yup'
import ApiCallService from '../../../../api/apiCallService'
import clsx from 'clsx'
import TextEditor from './TextEditor'
import {UPDATE_NEWSFEED} from '../../../../api/apiEndPoints'
import {showToast} from '../../../../utils/tool'
import Loader from '../../../../_everglow/partials/layout/Loader'
type Props = {
  isEditModalOpen: boolean
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  row: INewsFeed
}
const feedValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})
const EditModal = ({isEditModalOpen, setIsEditModalOpen, row}: Props) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      title: row.title,
      description: row.description,
      img: '',
    },
    validationSchema: feedValidationSchema,
    onSubmit: (values, {setSubmitting}) => {
      console.log('submit', values)
      //   addNewsFeed(values)
      updateFeed(values)
    },
  })
  const updateFeed = async (values: FormValues) => {
    formik.setSubmitting(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('image', values.img)
    const apiService = new ApiCallService(UPDATE_NEWSFEED, formData, {id: row._id})
    try {
      const response = await apiService.callAPI()
      if (response) {
        showToast('SUCCESS', 'NewsFeed Updated !!')
        console.log(response)
      }
    } catch (error: any) {
      showToast('ERROR', error.message)
      console.log(error)
    }
    formik.setSubmitting(false)
    setIsEditModalOpen(false)
  }
  return (
    <Modal size='lg' show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title className='fs-2'>Edit NewsFeed</Modal.Title>
      </Modal.Header>
      {formik.isSubmitting === false ? (
        <form className='form' onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <KTCardBody className='py-4'>
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
              >
                {/* begin::Input group */}
                <div className='fv-row mb-7'>
                  {/* begin::Label */}
                  <label className='d-block fw-bold fs-6 mb-5'>Image</label>
                  <div>
                    <img
                      src={row.imageUrl}
                      className=''
                      style={{height: '156px', width: '140px', position: 'absolute'}}
                    />
                    <input
                      type='file'
                      className='ml-4'
                      multiple
                      style={{
                        inset: 0,
                        height: '156px',
                        width: '140px',
                        padding: 0,
                        fontSize: '20px',
                        cursor: 'pointer',
                        opacity: 0,
                      }}
                      onChange={(e) => {
                        if (e.target.files) {
                          console.log(e.target?.files[0])
                          formik.setFieldValue('img', e.target.files[0])
                        }
                      }}
                    />
                  </div>
                </div>
                {/* end::Input group */}
                {/* begin::Input group */}
                <div className='fv-row mb-7'>
                  {/* begin::Label */}
                  <label className=' fw-bold fs-6 mb-2'>Title</label>
                  {/* end::Label */}
                  {/* begin::Input */}
                  <input
                    placeholder='Title'
                    {...formik.getFieldProps('title')}
                    type='text'
                    className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                      {'is-invalid': formik.touched.title && formik.errors.title},
                      {
                        'is-valid': formik.touched.title && !formik.errors.title,
                      }
                    )}
                    autoComplete='off'
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.title}</span>
                      </div>
                    </div>
                  )}
                  {/* end::Input */}
                </div>
                {/* end::Input group */}
              </div>
              {/* end::Scroll */}
              <TextEditor formik={formik} data={row.description} />
              {/* begin::Actions */}
            </KTCardBody>
          </Modal.Body>
          {/* end::Actions */}
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <>
              <Button
                type='submit'
                variant='primary'
                data-kt-users-modal-action='submit'
                disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
              >
                <span className='indicator-label'>Save</span>
              </Button>
            </>
          </Modal.Footer>
        </form>
      ) : (
        <KTCardBody className='d-flex justify-content-center align-items-center'>
          <Loader />
        </KTCardBody>
      )}
    </Modal>
  )
}
export default EditModal
