import {KTCard, KTCardBody, toAbsoluteUrl} from '../../../../_everglow/helpers'
import TextEditor from './TextEditor'
import {useFormik} from 'formik'
import clsx from 'clsx'
import * as Yup from 'yup'
import {FormValues} from '../../../../types'
import ApiCallService from '../../../../api/apiCallService'
import {POSTNEWSFEED} from '../../../../api/apiEndPoints'
import {showToast} from '../../../../utils/tool'
import {useNavigate} from 'react-router-dom'
const feedValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})
const AddNewsFeed = () => {
  const navigate = useNavigate()
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      img: '',
    },
    validationSchema: feedValidationSchema,
    onSubmit: (values, {resetForm, setSubmitting}) => {
      setSubmitting(true)
      console.log('submit', values)
      addNewsFeed(values)
      setSubmitting(false)
    },
  })
  const addNewsFeed = async (values: FormValues) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('image', values.img)
    const apiService = new ApiCallService(POSTNEWSFEED, formData)
    try {
      const response = await apiService.callAPI()
      if (response) {
        showToast('SUCCESS', 'NewsFeed Added !!')
        console.log(response)
        navigate('/newsfeed/viewnewsfeed')
      }
    } catch (error: any) {
      showToast('ERROR', error.message)
      console.log(error)
    }
  }
  return (
    <KTCard>
      <KTCardBody className='py-4'>
        <form className='form' onSubmit={formik.handleSubmit}>
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
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACcCAMAAABx/wiUAAAAVFBMVEXa3ODa3ODa3ODa3ODa3ODa3ODa3OBwcHB5eXmDg4OMjIyVlZWenp6oqKixsbG6urrDw8PNzc3W1tba3ODf39/j5ejk5ejo6Ojy8vL3+Pj4+Pj7+/v2U5KqAAAAB3RSTlMGiImQke3ulVLqiQAAAkJJREFUeNrt3N1u4jAQBeDsFjqO/zFu7eW8/3vuRQIEqKpsC7XbPXMTRYrkT5Px2M5FhmGz3fcSz5theHo5oJc4vPwatv1wgMN22KOn2NNDDz300EMPPfTQQw899NBDDz300EMPPfTQQw899NBDDz300PNjPSV6H0svnmJFRERs6cKTlcyhcgeecuKIqJK8T209VhahRERMbegpchumoSfOBp3NGZTaefzMqcAZ5Jt5sj5xFqBmnkV2liBf23iuOGeQii08eR58kY1TMwoNPMfW47yPAKL37vNz7BOe8Ty6ve6MH25CH/csW+GtR9Wv9tR3PVK+/H3pvvKD0Ff9LAtaOe/UhafB/FpsxW6iRf8Binlb06Y/A0CO/jZ2jdYvnr/ooYee/9qTZO2TRmQH4N+W1vWe6kRE59WenRQY9zBP1ToBoa72hHG6PsgTVJnflxXRBYhKxE2nMBWmw9h00fm4W3MmAJJQzerPHqs9xh7rx6BqiywReQwIKiNKylJQEoLKcOMpP7PH6lq1u69ndEdPAYKB19OY2gOwripbAWgPZMmXnio7IKhH5QdAMHAGQBSMAYAzKE5Mnrew6dIzn4zuXT/1wnOVHwAw8x3wRn7uPr9GnYFYj54iAXkMiCohzhlRCCoB4bZ+Cmq4c/8pVkTGkwdxnOZXEFEBRUTGNE0rc+2pdvUWn+sXPfTQQw899NBDDz300EMPPfTQQw899NBDDz300EMPPfTQQw8939PT2/9On177Af15/T0Mm+ee/pf7F9/R6vIuZ6X4AAAAAElFTkSuQmCC'
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
          <TextEditor />
          {/* begin::Actions */}
          <div className=' pt-15'>
            <button
              type='submit'
              className='btn btn-primary'
              data-kt-users-modal-action='submit'
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
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
export default AddNewsFeed
