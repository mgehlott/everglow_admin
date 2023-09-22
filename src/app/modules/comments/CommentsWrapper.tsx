import {useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../_everglow/helpers'
import Loader from '../../../_everglow/partials/layout/Loader'
import DataTable, {TableColumn} from 'react-data-table-component'
import {ICampaignName, IComment} from '../../../types/response_data/response'
import {GET_CAMPAIGNS_NAME, GET_COMMENTS} from '../../../api/apiEndPoints'
import ApiCallService from '../../../api/apiCallService'
import CusmtomModal from '../../../_everglow/partials/modals/CustomModal/CustomModal'
import {Modal} from 'react-bootstrap'
import {getSelectOptions} from '../../../utils/helpers'
import CommentAction from './CommentAction'
import Select from 'react-select'
import {SingleValue} from 'react-select'
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
type OptionType = {
  value: string
  label: string
}
const CommentsWrapper = () => {
  const [data, setData] = useState<Array<IComment>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [currPage, setCurrPage] = useState(1)
  const [campaigns, setCampaigns] = useState<Array<ICampaignName>>([])
  const [selected, setSelected] = useState<OptionType>()
  const [total, setTotal] = useState(0)
  const pagePerItem = 3
  useEffect(() => {
    ;(() => {
      fetchComments(currPage)
    })()
  }, [selected])
  useEffect(() => {
    ;(() => {
      fetchCampaign()
    })()
  }, [])
  const fetchComments = async (page: number) => {
    if (page == 1) setIsLoading(true)
    try {
      const apiService = new ApiCallService(GET_COMMENTS, {
        page: page,
        limit: pagePerItem,
        campaign: selected?.value || '',
      })
      const response = await apiService.callAPI()
      console.log('comment response', response)
      if (response) {
        setData(response.result)
        setTotal(response.total)
      }
    } catch (error) {
      console.log(error)
    }
    if (page == 1) setIsLoading(false)
  }
  const fetchCampaign = async () => {
    try {
      const apiService = new ApiCallService(GET_CAMPAIGNS_NAME)
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setCampaigns(response.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const commentsColumn: TableColumn<IComment>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: 'Campaign',
      selector: (row) => row.campaign,
      sortable: true,
      cell: (row) => <div>{row.campaign}</div>,
    },
    {
      name: 'Comment',
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
      name: 'Action',
      cell: (row) => <CommentAction row={row} setData={setData} />,
    },
  ]
  console.log('comment', data)
  const handlePageChange = (page: number) => {
    fetchComments(page)
    setCurrPage(page)
  }
  return (
    <KTCard>
      <div className='card-header mt-4' style={{display: 'block'}}>
        <div className='row mb-4'>
          <div className='card-title col-lg'>
            <h3 className='card-label'>View Comments</h3>
          </div>
          <div className='col-lg-6'>
            <Select
              className='basic-single'
              classNamePrefix='select'
              isClearable={true}
              name='Campaign'
              placeholder='Select Campaign'
              options={getSelectOptions(campaigns)}
              onChange={(newValue: SingleValue<OptionType>) => {
                if (newValue) {
                  console.log('nv', newValue)
                  setSelected(newValue)
                } else {
                  setSelected(undefined)
                }
              }}
            />
          </div>
        </div>
      </div>
      {isLoading === false ? (
        <KTCardBody>
          {data && data.length > 0 ? (
            <DataTable
              responsive
              columns={commentsColumn}
              data={data}
              customStyles={customStyle}
              pagination
              highlightOnHover
              paginationServer
              paginationComponentOptions={{
                noRowsPerPage: true,
              }}
              paginationPerPage={pagePerItem}
              paginationTotalRows={total}
              onChangePage={handlePageChange}
              onRowClicked={(row, e) => {
                console.log(row)
                setDescription(row.description)
              }}
            />
          ) : (
            <div className='d-flex justify-content-center align-items-center '>
              <h2>No Comments </h2>
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
          <Modal.Title>Comment</Modal.Title>
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
          <div className='fs-4' dangerouslySetInnerHTML={{__html: description}}></div>
        </Modal.Body>
      </CusmtomModal>
    </KTCard>
  )
}
export default CommentsWrapper
