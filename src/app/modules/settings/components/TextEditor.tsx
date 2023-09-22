import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import {FormikProps} from 'formik'
import {FormValues} from '../../../../types'
import {SetStateAction} from 'react'
type Props = {
  data: string
  setData: React.Dispatch<SetStateAction<string>>
}
const TextEditor = ({data, setData}: Props) => {
  let editor: DecoupledEditor
  return (
    <>
      <p className='fw-bold fs-6 mb-2'>Description</p>
      <CKEditor
        data={data}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor)
          editor = editor
          // Insert the toolbar before the editable area.
          editor.ui
            .getEditableElement()
            ?.parentElement?.insertBefore(
              editor.ui.view.toolbar.element as Node,
              editor.ui.getEditableElement() as Node
            )
        }}
        editor={DecoupledEditor}
        config={{
          toolbar: [
            '|',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'heading',
            'fontsize',
            'fontfamily',
            'alignment',
            'numberedList',
            'bulletedList',
            '|',
            'undo',
            'redo',
          ],
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          //     formik.setFieldValue('description', data)
          setData(data)
          console.log({data})
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    </>
  )
}
export default TextEditor
