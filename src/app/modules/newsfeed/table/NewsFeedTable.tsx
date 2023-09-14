import {useMemo, useState} from 'react'
import {INewsFeed} from '../../../../types'
import ApiCallService from '../../../../api/apiCallService'
import {GETNEWSFEED} from '../../../../api/apiEndPoints'
import useFetchUrlParams from '../../../../hooks/useFetchUrlParams'
import newsFeedColumn from './column/_column'
import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../_everglow/helpers'
import DataTable from 'react-data-table-component'
const NewsFeedTable = () => {
  const [page, setPage] = useState(1)
  const data = useFetchUrlParams<INewsFeed>(GETNEWSFEED, page, 3)
  // const columns = useMemo(() => newsFeedColumn, [])
  // const {getTableProps, getTableBodyProps, rows, prepareRow, headers} = useTable<INewsFeed>({
  //   columns,
  //   data,
  // })
  console.log('data in nf', data)
  // console.log(rows, headers)
  return <DataTable columns={newsFeedColumn} data={data} title={<h1>View Table</h1>} pagination />
  // return (
  //   // <KTCardBody className='py-4'>
  //   //   <table
  //   //     {...getTableProps}
  //   //     className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
  //   //   >
  //   //     <thead>
  //   //       <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
  //   //         {headers.map((column: ColumnInstance<INewsFeed>) => (
  //   //           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
  //   //         ))}
  //   //       </tr>
  //   //     </thead>
  //   //     <tbody className='text-gray-600 fw-bold' {...getTableBodyProps}>
  //   //       {rows.map((row: Row<INewsFeed>, i) => {
  //   //         prepareRow(row)
  //   //         return (
  //   //           <tr {...row.getRowProps()}>
  //   //             {row.cells.map((cell) => {
  //   //               return (
  //   //                 <td className='text-end min-w-100px' {...cell.getCellProps()}>
  //   //                   {cell.render('Cell')}
  //   //                 </td>
  //   //               )
  //   //             })}
  //   //           </tr>
  //   //         )
  //   //       })}
  //   //     </tbody>
  //   //   </table>
  //   // </KTCardBody>
  // )
}
export default NewsFeedTable
