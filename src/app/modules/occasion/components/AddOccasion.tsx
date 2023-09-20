import {CallTracker} from 'assert'
import {Card, Form} from 'react-bootstrap'
import {ChromePicker} from 'react-color'
import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import ApiCallService from '../../../../api/apiCallService'
import {ADD_OCCASION} from '../../../../api/apiEndPoints'
import {showToast} from '../../../../utils/tool'
import Loader from '../../../../_everglow/partials/layout/Loader'
type FormValues = {
  title: string
  color: string
  icon: string
}
const validationSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Title is required'),
  color: Yup.string().min(7).required('Invalid Hex Color'),
})
const AddOccasion = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      color: '',
      icon: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log(values)
      addOccasion(values)
      resetForm()
    },
  })
  const addOccasion = async (values: FormValues) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('color', values.color)
    formData.append('icon', values.icon)
    try {
      const apiService = new ApiCallService(ADD_OCCASION, formData)
      const response = await apiService.callAPI()
      if (response) {
        setTimeout(() => {
          showToast('SUCCESS', 'Occasion Added !!')
          console.log(response)
          setIsLoading(false)
        }, 2000)
      }
    } catch (error: any) {
      showToast('ERROR', error.message)
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <KTCard className='pt-5'>
      <Card.Header className='row'>
        <h3 className='col-12 col-lg-auto'>Add Occasion</h3>
        <Form.Check
          className=' col-12 col-lg-auto'
          type='switch'
          id='custom-switch'
          label='Show'
          onChange={() => setIsSwitchOn(!isSwitchOn)}
        />
      </Card.Header>
      {isSwitchOn &&
        (isLoading === false ? (
          <KTCardBody>
            <Form onSubmit={formik.handleSubmit}>
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
                <Form.Group className='mt-3 col-lg-3'>
                  <Form.Label>Occasion Image</Form.Label>
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
                          formik.setFieldValue('icon', e.target?.files[0])
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='col-lg-3 mt-3'>
                  <Form.Label>Color</Form.Label>
                  <div>
                    <ChromePicker
                      color={selectedColor}
                      onChange={(color, e) => {
                        console.log('change')
                        setSelectedColor(color.hex)
                        formik.setFieldValue('color', color.hex)
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
              <Card.Footer>
                <button type='submit' className='btn btn-primary'>
                  Add
                </button>
              </Card.Footer>
            </Form>
          </KTCardBody>
        ) : (
          <KTCardBody className='d-flex justify-content-center align-items-center'>
            <Loader />
          </KTCardBody>
        ))}
    </KTCard>
  )
}
export default AddOccasion
