/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {KTSVG} from '../../_everglow/helpers'
type Props = {
  searchTerm: string
  setSearchTerm: (s: string) => void
}
const SearchInput = ({searchTerm, setSearchTerm}: Props) => {
  return (
    <div className='card-title'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Search user'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
export default SearchInput
