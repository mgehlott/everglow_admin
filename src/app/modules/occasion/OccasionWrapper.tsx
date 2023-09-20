import {useEffect, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../_everglow/helpers'
import {IOccasion} from '../../../types'
import Loader from '../../../_everglow/partials/layout/Loader'
import ApiCallService from '../../../api/apiCallService'
import {GETOCCASIONS} from '../../../api/apiEndPoints'
import DataTable, {TableColumn} from 'react-data-table-component'

import AddOccasion from './components/AddOccasion'

import OccasionModal from './components/OccasionModal'
const customStyle = {
  rows: {
    style: {
      height: '80px',
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
      width: '150px',
    },
  },
}
const OccasionWrapper = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Array<IOccasion>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currRow, setCurrRow] = useState<IOccasion>()
  useEffect(() => {
    ;(() => fetchData())()
  }, [])
  useEffect(() => {
    ;(() => fetchData())()
  },[isModalOpen])
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const apiService = new ApiCallService(GETOCCASIONS, {page})
      const response = await apiService.callAPI()
      if (response) {
        setData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const occasionColumns: TableColumn<IOccasion>[] = [
    {
      name: 'Occasion Image',
      cell: (row) => (
        <img
          height='78px'
          width='100px'
          alt={row.title}
          src={row.iconUrl}
          style={{objectFit: 'fill'}}
        />
      ),
    },
    {
      name: 'Occasion Name',
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: 'Occasion Color',
      cell: (row) => (
        <div style={{backgroundColor: `${row.color}`, height: '70px', width: '70px'}}></div>
      ),
    },
    {
      name: 'Actions',
      center: true,
      cell: (row) => (
        <div
          onClick={() => {
            setIsModalOpen(true)
            setCurrRow(row)
          }}
        >
          <div className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3 text-primary' />
          </div>
        </div>
      ),
    },
  ]
  return (
    <>
      <div className='mb-5'>
        <AddOccasion />
      </div>
      <KTCard>
        <div className='card-header'>
          <div className='row'>
            <div className='card-title col-lg'>
              <h3 className='card-label'>View Occasions</h3>
            </div>
          </div>
        </div>
        {isLoading === false ? (
          <KTCardBody>
            {data && data.length > 0 ? (
              <DataTable
                responsive
                columns={occasionColumns}
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
        {isModalOpen && (
          <OccasionModal show={isModalOpen} onClose={() => setIsModalOpen(false)} row={currRow} />
        )}
      </KTCard>
    </>
  )
}
export default OccasionWrapper
