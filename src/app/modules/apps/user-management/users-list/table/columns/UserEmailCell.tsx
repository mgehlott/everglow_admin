import {FC} from 'react'
import { IUser } from '../../../../../../../types';
type Props = {
  user: IUser
}
const UserEmailCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>{user.email}</div>
)
export {UserEmailCell}
