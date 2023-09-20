import {PageTitle} from '../../../_everglow/layout/core'
import {useIntl} from 'react-intl'
import {UsersListWrapper} from '../apps/user-management/users-list/UsersList'
import DataTable, {TableColumn} from 'react-data-table-component'
import {IUser} from '../../../types'
import moment from 'moment'
import Actions from '../newsfeed/components/Actions'
import {KTCard, KTCardBody} from '../../../_everglow/helpers'
import {useEffect, useState} from 'react'
import SearchInput from '../../ui/SearchInput'
import Loader from '../../../_everglow/partials/layout/Loader'
import ApiCallService from '../../../api/apiCallService'
import {GETUSERS} from '../../../api/apiEndPoints'
import UserActions from './components/UserActions'
const customStyle = {
  rows: {
    style: {
      height: '50px',
    },
  },
  headCells: {
    style: {
      alignItems: 'center',
      minHeight: '40px',
    },
  },
  cells: {
    style: {},
  },
}
const Users = () => {
  return <UserWrapper />
}
const UserWrapper = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Array<IUser>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    ;(() => fetchData())()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      ;(() => fetchData())()
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const apiService = new ApiCallService(GETUSERS, {
        page: page,
        searchTerm: searchTerm,
      })
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const usersColumn: TableColumn<IUser>[] = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
      cell: (row) => <div>{row.firstName}</div>,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
      cell: (row) => <div>{row.lastName}</div>,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div style={{width: '150px'}}>{row.email.substring(0, 18)}</div>,
    },
    {
      name: 'Created At',
      selector: (row) => moment(row.createdAt).format('L'),
      sortable: true,
      cell: (row) => <div>{moment(row.createdAt).format('L')}</div>,
    },
    {
      name: 'Actions',
      center: true,
      cell: (row) => <UserActions />,
    },
  ]
  return (
    <KTCard>
      <div className='card-header mt-4' style={{display: 'block'}}>
        <div className='row mb-4'>
          <div className='card-title col-lg'>
            <h3 className='card-label'>View Users</h3>
          </div>
          <div className=' col-lg-6'>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </div>
      {isLoading === false ? (
        <KTCardBody>
          {data && data.length > 0 ? (
            <DataTable
              responsive
              columns={usersColumn}
              data={data}
              customStyles={customStyle}
              pagination
              highlightOnHover
            />
          ) : (
            <div className='d-flex justify-content-center align-items-center '>
              <h2>No News Feed</h2>
            </div>
          )}
        </KTCardBody>
      ) : (
        <KTCardBody className='d-flex justify-content-center align-items-center'>
          <Loader />
        </KTCardBody>
      )}
    </KTCard>
  )
}
export default UserWrapper
