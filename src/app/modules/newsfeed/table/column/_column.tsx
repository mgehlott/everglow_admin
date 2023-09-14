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
    cell: (row) => <img height='84px' width='76px' alt={row.title} src={row.imageUrl} />,
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
    cell: (row) => <div>{row.description}</div>,
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
