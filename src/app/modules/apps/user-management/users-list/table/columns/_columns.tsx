// @ts-nocheck
import {Column} from 'react-table'
import {UserFirstNameCell, UserInfoCell} from './UserFirstNameCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserEmailCell, UserTwoStepsCell} from './UserEmailCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {IUser} from '../../../../../../../types'
import {UserLastNameCell} from './UserLastNameCell'
import {UserDateCell} from './UserDateCell'
const usersColumns: ReadonlyArray<Column<IUser>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='First Name' className='min-w-125px' />
    ),
    id: 'firstName',
    accessor: 'firstName',
    Cell: ({...props}) => <UserFirstNameCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Last Name' className='min-w-125px' />
    ),
    accessor: 'lastName',
    Cell: ({...props}) => <UserLastNameCell user={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Last login' className='min-w-125px' />
  //   ),
  //   id: 'last_login',
  //   Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    accessor: 'email',
    Cell: ({...props}) => <UserEmailCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created At' className='min-w-125px' />
    ),
    accessor: 'createdAt',
    Cell: ({...props}) => <UserDateCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]
export {usersColumns}
