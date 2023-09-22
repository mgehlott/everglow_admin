import DataTable, {TableColumn} from 'react-data-table-component'
import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import Loader from '../../../../_everglow/partials/layout/Loader'
import {GETNEWSFEED} from '../../../../api/apiEndPoints'
import {INewsFeed} from '../../../../types'
import {useEffect, useState} from 'react'
import CusmtomModal from '../../../../_everglow/partials/modals/CustomModal/CustomModal'
import moment from 'moment'
import Actions from './Actions'
import {Modal} from 'react-bootstrap'
import SearchInput from '../../../ui/SearchInput'
import ApiCallService from '../../../../api/apiCallService'
const customStyle = {
  rows: {
    style: {
      minHeight: '80px',
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
      width: '300px',
    },
  },
}
const ViewNewsFeed = () => {
  const [currPage, setCurrPage] = useState(1)
  const [data, setData] = useState<Array<INewsFeed>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [total, setTotal] = useState(0)
  const perPageItem = 3
  useEffect(() => {
    ;(() => fetchData())()
  }, [currPage])
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
      const apiService = new ApiCallService(GETNEWSFEED, {
        page: currPage,
        limit: perPageItem,
        searchTerm: searchTerm,
      })
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setData(response.data)
        setTotal(response.total)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const newsFeedColumn: TableColumn<INewsFeed>[] = [
    {
      name: 'Newsfeed Image',
      cell: (row) => (
        <img
          height='78px'
          width='100px'
          alt={row.title}
          src={row.imageUrl}
          style={{objectFit: 'fill'}}
        />
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      cell: (row) => (
        <div className='py-2'>
          <div
            className='bg-none'
            dangerouslySetInnerHTML={{__html: row.description?.slice(0, 20)}}
          ></div>
          <button className='btn p-0' onClick={() => setIsModalOpen(true)}>
            <span
              data-tag='allowRowEvents'
              style={{fontSize: '0.9rem', fontWeight: '500', color: '#3783e7'}}
            >
              READ MORE
            </span>
          </button>
        </div>
      ),
    },
    {
      name: 'Created At',
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => <div>{moment(row.createdAt).format('L')}</div>,
    },
    {
      name: 'Actions',
      center: true,
      cell: (row) => <Actions row={row} setData={setData} />,
    },
  ]
  console.log('data in newsfeed', data)
  const handlePageChange = (page: number) => {
    fetchData()
  }
  console.log('currpage,total,perpageitem', currPage, total, perPageItem)
  return (
    <KTCard>
      <div className='card-header mt-4' style={{display: 'block'}}>
        <div className='row mb-4'>
          <div className='card-title col-lg'>
            <h3 className='card-label'>View Campaign</h3>
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
              columns={newsFeedColumn}
              data={data}
              customStyles={customStyle}
              highlightOnHover
              pagination
              paginationServer
              paginationComponentOptions={{
                noRowsPerPage: true,
              }}
              paginationPerPage={perPageItem}
              paginationTotalRows={total}
              onChangePage={(page) => {
                setCurrPage(page)
              }}
              onRowClicked={(row, e) => {
                setDescription(row.description)
              }}
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
      <CusmtomModal onClose={() => setIsModalOpen(false)} show={isModalOpen}>
        <Modal.Header>
          <Modal.Title>Description</Modal.Title>
          <button className='btn p-0' onClick={() => setIsModalOpen(false)}>
            <span
              data-tag='allowRowEvents'
              style={{fontSize: '0.9rem', fontWeight: '500', color: '#3783e7'}}
            >
              READ LESS
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div dangerouslySetInnerHTML={{__html: description}}></div>
        </Modal.Body>
      </CusmtomModal>
    </KTCard>
  )
}
export default ViewNewsFeed
