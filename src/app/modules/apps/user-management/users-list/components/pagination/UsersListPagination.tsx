/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {KTSVG} from '../../../../../../../_everglow/helpers'
type Props = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalUsers: number
}
const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }
  if (label === 'Next &raquo;') {
    return 'Next'
  }
  return label
}
const UsersListPagination = ({page, setPage, totalUsers}: Props) => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }
    updateState({page, items_per_page: pagination.items_per_page || 10})
  }
  console.log('page', page)
  const itemsRangeLeft = page * 3 - 2
  const itemsRangeRight = page*3
  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate' className='d-flex gap-4 align-items-center'>
          <div>
            <div>{`${itemsRangeLeft} - ${itemsRangeRight} of ${totalUsers}`}</div>
          </div>
          <a
            href='#'
            style={{cursor: 'pointer'}}
            className={clsx({disabled: page == 1})}
            onClick={() => {
              setPage(1)
            }}
          >
            First
          </a>
          <div className='d-flex'>
            <div onClick={() => setPage((page) => page - 1)}>
              <KTSVG
                path='/media/icons/duotune/arrows/arr074.svg'
                className={`svg-icon svg-icon-2x ms-n1`}
              />
            </div>
            <div onClick={() => setPage((page) => page + 1)}>
              <KTSVG
                path='/media/icons/duotune/arrows/arr071.svg'
                className={`svg-icon svg-icon-2x ms-n1`}
              />
            </div>
          </div>
          <a
            href='#'
            style={{cursor: 'pointer'}}
            className={clsx({disabled: page == 1})}
            onClick={() => {
              const last =
                totalUsers % 3 > 0 ? Math.floor(totalUsers / 3) + 1 : Math.floor(totalUsers / 3)
              console.log(last)
              setPage(last)
            }}
          >
            Last
          </a>
          {/* <ul className='pagination'>
            {pagination.links
              ?.map((link) => {
                return {...link, label: mappedLabel(link.label)}
              })
              .map((link) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: page === link.page,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    className={clsx('page-link', {
                      'page-text': link.label === 'Previous' || link.label === 'Next',
                      'me-5': link.label === 'Previous',
                    })}
                    onClick={() => setPage(link.page as number)}
                    style={{cursor: 'pointer'}}
                  >
                    {mappedLabel(link.label)}
                  </a>
                </li>
              ))}
          </ul> */}
        </div>
      </div>
    </div>
  )
}
export {UsersListPagination}
