import DataTable, {TableColumn} from 'react-data-table-component'
import {IUser} from '../../../types'
import moment from 'moment'
import {KTCard, KTCardBody} from '../../../_everglow/helpers'
import {useEffect, useRef, useState} from 'react'
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
const paginationComponentOptions = {
  noRowsPerPage: true,
}
const UserWrapper = () => {
  // const [page, setPage] = useState(1)
  const [data, setData] = useState<Array<IUser>>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  //console.log('page state', page)
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
  const fetchData = async (page: number = 1) => {
    setIsLoading(true)
    try {
      const apiService = new ApiCallService(GETUSERS, {
        page: page,
        limit: 10,
        searchTerm: searchTerm,
      })
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setData(response.result)
        setTotal(response.total)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const handlePageChange = (page: number) => {
    fetchData(page)
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
      cell: (row) => <UserActions isActive={row.isActive} _id={row._id} />,
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
              paginationComponentOptions={paginationComponentOptions}
              paginationServer
              paginationTotalRows={total}
              onChangePage={(page) => {
                console.log('curr page', page)
                handlePageChange(page)
              }}
            />
          ) : (
            <div className='d-flex justify-content-center align-items-center '>
              <h2>No User Found</h2>
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
