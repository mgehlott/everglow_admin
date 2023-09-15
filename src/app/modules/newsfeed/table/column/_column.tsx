import {Column} from 'react-table'
import {INewsFeed} from '../../../../../types'
import {TableColumn} from 'react-data-table-component'
import moment from 'moment'
import Actions from './Actions'
// const newsFeedColumn: ReadonlyArray<Column<INewsFeed>> = [
//   {
//     Header: 'Newsfeed Image',
//     accessor: 'image',
//   },
//   {
//     Header: 'Title',
//     accessor: 'title',
//   },
//   {
//     Header: 'Description',
//     accessor: 'description',
//   },
//   {
//     Header: 'Created Date',
//     accessor: 'createdAt',
//   },
//   {
//     Header: 'Actions',
//     id: 'actions',
//   },
// ]

const newsFeedColumn: TableColumn<INewsFeed>[] = [
  {
    name: 'Newsfeed Image',
    cell: (row) => (
      <img
        height='78px'
        width='100px'
        alt={row.title}
        src={row.imageUrl}
        style={{objectFit: 'cover'}}
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
          dangerouslySetInnerHTML={{__html: row.description?.slice(0, 95)}}
        ></div>
        <button
          className='btn btn-light text-primary p-0 px-2 bg-none'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          <span style={{fontSize: '0.9rem', fontWeight: '500'}}>Read more</span>
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
    cell: (row) => <Actions row={row} />,
  },
]
export default newsFeedColumn
