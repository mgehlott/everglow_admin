import {Form, Modal} from 'react-bootstrap'
import {ChromePicker} from 'react-color'
import {IOccasion} from '../../../../types'
import {useFormik} from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
import {showToast} from '../../../../utils/tool'
import ApiCallService from '../../../../api/apiCallService'
import {UPDATE_OCCASION} from '../../../../api/apiEndPoints'
import Loader from '../../../../_everglow/partials/layout/Loader'
import {useNavigate} from 'react-router-dom'
type Props = {
  row?: IOccasion
  show: boolean
  onClose: () => void
}
type FormValues = {
  title: string
  color: string
  icon: string
}
const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).required('Title is required'),
})
const OccasionModal = ({row, show, onClose}: Props) => {
  const [setectedColor, setSelectedColor] = useState<string>(row?.color || '')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  console.log('form row edit', row)
  const formik = useFormik<FormValues>({
    initialValues: {
      title: row?.title || '',
      color: row?.color || '',
      icon: row?.icon || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log('submit', values)
      updateOccasion(values)
    },
  })
  console.log(formik.initialValues)
  const updateOccasion = async (values: FormValues) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('color', values.color)
    if (typeof values.icon === 'object') {
      formData.append('icon', values.icon)
    }
    try {
      const apiService = new ApiCallService(UPDATE_OCCASION, formData, {id: row?._id})
      const response = await apiService.callAPI()
      if (response) {
        {
          !isLoading && showToast('SUCCESS', 'Occasion Updated !!')
        }
        console.log(response)
        onClose()
      }
    } catch (error: any) {
      console.log(error)
      showToast('ERROR', error.message)
    }
    setIsLoading(false)
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <div>
          <h3>Edit Occasion</h3>
        </div>
      </Modal.Header>
      {isLoading === false ? (
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className='row'>
              <Form.Group className='col-lg-6'>
                <Form.Label>Occasion Name</Form.Label>
                <Form.Control type='text' {...formik.getFieldProps('title')} />
                {formik.touched.title && formik.errors.title && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.title}</span>
                    </div>
                  </div>
                )}
              </Form.Group>
            </div>
            <div className='row mt-5'>
              <Form.Group className='mt-3 col-lg-auto'>
                <Form.Label>Occasion Image</Form.Label>
                <div>
                  <img
                    src={row?.iconUrl}
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
                        formik.setFieldValue('icon', e.target.files[0])
                      }
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className='col-lg-auto'>
                <Form.Label>Color</Form.Label>
                <div>
                  <ChromePicker
                    color={setectedColor}
                    onChange={(color, e) => {
                      formik.setFieldValue('color', color.hex)
                      setSelectedColor(color.hex)
                    }}
                  />
                </div>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='btn btn-secondary' onClick={onClose}>
              Close
            </div>
            <button type='submit' className='btn btn-primary'>
              Save Changes
            </button>
          </Modal.Footer>
        </Form>
      ) : (
        <Modal.Body className='d-flex justify-content-center align-items-center'>
          <Loader />
        </Modal.Body>
      )}
    </Modal>
  )
}
export default OccasionModal
