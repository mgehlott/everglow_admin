import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import TextEditor from './TextEditor'
const AddNewsFeed = () => {
  return (
    <KTCard>
      <KTCardBody className='py-4'>
        <input type='file' />
        <TextEditor />
      </KTCardBody>
    </KTCard>
  )
}
export default AddNewsFeed
