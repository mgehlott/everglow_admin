import {useMemo, useState, useEffect, useRef} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from '../table/columns/CustomHeaderColumn'
import {CustomRow} from '../table/columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {usersColumns} from './columns/_columns'
import {User} from '../core/_models'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {KTCardBody} from '../../../../../../_everglow/helpers'
import {IUser} from '../../../../../../types/index'
import ApiCallService from '../../../../../../api/apiCallService'
import {GETUSERS} from '../../../../../../api/apiEndPoints'
const UsersTable = () => {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const [page, setPage] = useState(1)
  const [fetchedUsers, setFetchedUser] = useState<Array<IUser>>([])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns: columns,
    data: fetchedUsers,
  })
  const totalUsers = useRef(0)
  useEffect(() => {
    ;(() => {
      fetchUsers()
    })()
  }, [page])
  const fetchUsers = async () => {
    try {
      const apiService = new ApiCallService(GETUSERS, {
        page,
        limit: 3,
      })
      const response = await apiService.callAPI()
      console.log(response)
      if (response) {
        setFetchedUser(response.users)
        if (totalUsers.current === 0) {
          totalUsers.current = response.totalUsers
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<IUser>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<IUser>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UsersListPagination page={page} setPage={setPage} totalUsers={totalUsers.current} />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  )
}
export {UsersTable}
