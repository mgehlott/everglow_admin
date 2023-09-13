import {FC} from 'react'
import { IUser } from '../../../../../../../types'
import moment from 'moment'
type Props = {
  user: IUser
}
const UserDateCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>{moment(user.createdAt).format('L')}</div>
)
export {UserDateCell}
