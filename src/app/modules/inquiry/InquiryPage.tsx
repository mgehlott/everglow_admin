import {useEffect, useState} from 'react'
import {IMessage} from '../../../types'
import ApiCallService from '../../../api/apiCallService'
import DataTable, {TableColumn} from 'react-data-table-component'
import moment from 'moment'
import {KTCard, KTCardBody} from '../../../_everglow/helpers'
import SearchInput from '../../ui/SearchInput'
import Loader from '../../../_everglow/partials/layout/Loader'
import {GET_MESSAGES} from '../../../api/apiEndPoints'
import InquiryAction from './InquiryAction'
import {Button, Modal} from 'react-bootstrap'
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
    style: {
      width: '350px',
    },
  },
}
const InquiryPage = () => {
  const [currPage, setCurrPage] = useState(1)
  const [data, setData] = useState<Array<IMessage>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [show, setShow] = useState(false)
  const [total, setTotal] = useState(0)
  const perPageItem = 5
  useEffect(() => {
    ;(() => fetchData(currPage))()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      ;(() => fetchData(currPage))()
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])
  const fetchData = async (page: number) => {
    if (page == 1) setIsLoading(true)
    try {
      const apiService = new ApiCallService(GET_MESSAGES, {
        page: page,
        limit: perPageItem,
        name: searchTerm,
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
    if (page == 1) setIsLoading(false)
  }
  const messageTable: TableColumn<IMessage>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div>{row.email}</div>,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
      cell: (row) => <div>{`${row.message.substring(0, 20)}...`}</div>,
    },
    {
      name: 'Date',
      selector: (row) => moment(row.createdAt).format('L'),
      sortable: true,
      cell: (row) => <div>{moment(row.createdAt).format('L')}</div>,
    },
    {
      name: 'Actions',
      center: true,
      cell: (row) => (
        <div>
          <InquiryAction row={row} setData={setData} />
        </div>
      ),
    },
  ]
  const handlePageChange = (page: number) => {
    fetchData(page)
    setCurrPage(page)
  }
  return (
    <>
      <KTCard>
        <div className='card-header mt-4' style={{display: 'block'}}>
          <div className='row mb-4'>
            <div className='card-title col-lg'>
              <h3 className='card-label'>View Messages</h3>
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
                columns={messageTable}
                data={data}
                customStyles={customStyle}
                pagination
                highlightOnHover
                paginationServer
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                paginationPerPage={perPageItem}
                paginationTotalRows={total}
                onChangePage={handlePageChange}
              />
            ) : (
              <div className='d-flex justify-content-center align-items-center '>
                <h2>No Messages</h2>
              </div>
            )}
          </KTCardBody>
        ) : (
          <KTCardBody className='d-flex justify-content-center align-items-center'>
            <Loader />
          </KTCardBody>
        )}
      </KTCard>
    </>
  )
}
export default InquiryPage
