import {PageTitle} from '../../../_everglow/layout/core'
import {useIntl} from 'react-intl'
import {UsersListWrapper} from '../apps/user-management/users-list/UsersList'
const Users = () => {
  return <UserWrapper />
}
const UserWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.USERS'})}</PageTitle>
      <UsersListWrapper />
    </>
  )
}
export default UserWrapper
