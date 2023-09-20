import DataTable, {TableColumn} from 'react-data-table-component'
import {KTCard, KTCardBody} from '../../../../_everglow/helpers'
import Loader from '../../../../_everglow/partials/layout/Loader'
import {GETNEWSFEED} from '../../../../api/apiEndPoints'
import useFetchUrlParams from '../../../../hooks/useFetchUrlParams'
import {INewsFeed} from '../../../../types'
import {useEffect, useState} from 'react'
//import newsFeedColumn from '../table/column/_column'
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
  const [page, setPage] = useState(1)
  //  const [data, isLoading] = useFetchUrlParams<INewsFeed>(GETNEWSFEED, page, 3)
  const [data, setData] = useState<Array<INewsFeed>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [description, setDescription] = useState('')
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
      const apiService = new ApiCallService(GETNEWSFEED, {
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
      cell: (row) => <Actions row={row} />,
    },
  ]
  console.log('data in nf', data)
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
              pagination
              highlightOnHover
              dense
              onRowClicked={(row, e) => {
                console.log(row)
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
