import {KTCard, KTCardBody, KTSVG} from '../../../_everglow/helpers'
import useFetchUrlParams from '../../../hooks/useFetchUrlParams'
import {ICampaign} from '../../../types/response_data/response'
import {GET_ALL_CAMPAIGNS} from '../../../api/apiEndPoints'
import {useEffect, useMemo, useState} from 'react'
import Loader from '../../../_everglow/partials/layout/Loader'
import DataTable, {TableColumn} from 'react-data-table-component'
import moment from 'moment'
import ApiCallService from '../../../api/apiCallService'
import {type} from 'os'
import SearchInput from '../../ui/SearchInput'
import DateInput from '../../ui/DateInput'
import CampaignActions from './CampaignAction'
import {Modal} from 'react-bootstrap'
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
      width: '200px',
    },
  },
}
type ModalData = {
  _id?: string
  title?: string
  description?: string
  occasion_name?: string
  visibility?: string
  duration?: string
  allow_comments?: boolean
  members?: number
  created_by?: string
}
const CampaignWrapper = () => {
  const [page, setPage] = useState(1)
  // const [data, isLoading] = useFetchUrlParams<ICampaign>(GET_ALL_CAMPAIGNS, page, 10)
  const [data, setData] = useState<Array<ICampaign>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currRow, setCurrRow] = useState<ICampaign>()
  const campaignColumn: Array<TableColumn<ICampaign>> = [
    {
      name: 'Image',
      // width: '150px',
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
      //  width: '150px',
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: 'Creator Name',
      selector: (row) => row.creator.name,
      sortable: true,
      cell: (row) => <div>{row.creator.name}</div>,
    },
    {
      name: 'Occasion Name',
      selector: (row) => row.occasionType.title,
      sortable: true,
      cell: (row) => <div>{row.occasionType.title}</div>,
    },
    {
      name: 'Start Date',
      selector: (row) => moment(row.startDate).format('L'),
      sortable: true,
      cell: (row) => <div>{moment(row.startDate).format('L')}</div>,
    },
    {
      name: 'Time',
      selector: (row) => row.duration,
      sortable: true,
      cell: (row) => (
        <div>
          {moment.utc(moment.duration(row.duration, 'minutes').asMilliseconds()).format('HH:mm:ss')}
        </div>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <CampaignActions
          row={row}
          modalOpenHandler={() => setIsModalOpen(true)}
          setCurrRow={setCurrRow}
          setData={setData}
        />
      ),
    },
  ]
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [date, setDate] = useState('')
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
  }, [searchTerm, date])
  const modalData = useMemo(() => {
    let obj: ModalData = {}
    if (currRow) {
      Object.entries(currRow).forEach((r) => {
        if (r[0] === '_id') {
          obj._id = r[1]
        } else if (r[0] === 'title') {
          obj.title = r[1]
        } else if (r[0] === 'description') {
          obj.description = r[1].substring(0, 30)
        } else if (r[0] === 'occasionType') {
          obj.occasion_name = r[1].title
        } else if (r[0] === 'visibility') {
          obj.visibility = +r[1] == 1 ? 'Public' : 'Private'
        } else if (r[0] === 'duration') {
          obj.duration = r[1] + ' mins'
        } else if (r[0] === 'isCommentAllow') {
          obj.allow_comments = r[1]
        } else if (r[0] === 'joinedUsers') {
          obj.members = r[1].length
        } else if (r[0] === 'creator') {
          obj.created_by = r[1].name
        }
      })
    }
    return obj
  }, [isModalOpen])
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const apiService = new ApiCallService(GET_ALL_CAMPAIGNS, {
        page: page,
        searchTerm: searchTerm,
        startDate: date,
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
  console.log('campaign', data, isLoading)
  return (
    <>
      <KTCard>
        <div className='card-header mt-4' style={{display: 'block'}}>
          <div className='row mb-4'>
            <div className='card-title col-lg'>
              <h3 className='card-label'>View Campaign</h3>
            </div>
          </div>
          <div className='row mt-4 p-3'>
            <div className=' col-lg-6'>
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className='col-md-12 col-lg-6'>
              <DateInput date={date} setDate={setDate} />
            </div>
          </div>
        </div>
        {isLoading === false ? (
          <KTCardBody>
            {data && data.length > 0 ? (
              <DataTable
                responsive
                columns={campaignColumn}
                data={data}
                customStyles={customStyle}
                pagination
                highlightOnHover
                dense
                // onRowClicked={(row, e) => {
                //   console.log(row)
                //   setDescription(row.description)
                // }}
              />
            ) : (
              <div className='d-flex justify-content-center align-items-center'>
                <h2>No Campaign Found</h2>
              </div>
            )}
          </KTCardBody>
        ) : (
          <KTCardBody className='d-flex justify-content-center align-items-center'>
            <Loader />
          </KTCardBody>
        )}
      </KTCard>
      {
        <Modal centered={true} show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header>
            <div>
              <h3>Campaign Details</h3>
            </div>
          </Modal.Header>
          <Modal.Body>
            {modalData &&
              Object.entries(modalData).map((r) => {
                console.log(r)
                if (r[0] === '_id') return null
                return (
                  <div key={r[0]} className='mb-3 text-start'>
                    <span className='fw-semibold text-capitalize'>{r[0].split('_').join(' ')}</span>
                    {' : '}
                    <span>{`${r[1]}`}</span>
                  </div>
                )
              })}
          </Modal.Body>
        </Modal>
      }
    </>
  )
}
export default CampaignWrapper
