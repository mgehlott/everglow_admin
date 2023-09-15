import {FC, ReactNode} from 'react'
import {WithChildren} from '../../../helpers'
import {Modal} from 'react-bootstrap'
type Props = {
  show: boolean
  onClose: () => void
} & WithChildren
const CusmtomModal: FC<Props> = ({children, show, onClose}) => {
  return (
    <Modal show={show} onHide={onClose}>
      {children}
    </Modal>
  )
}
export default CusmtomModal
