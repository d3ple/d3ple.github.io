import React from 'react'

import { Pagination as MuiPagination, PaginationItem, SxProps } from '@mui/material';

interface Props {
  currentPage: number,
  count: number,
  onChange: (page: number) => void,
}

const Pagination: React.FC<Props> = ({
  currentPage,
  count,
  onChange,
}) => {

  const defaultRestyling: SxProps = {
    fontWeight: 400,
    fontSize: '1.25rem',
    margin: '0 5px',
  }

  return (
    <MuiPagination
      page={currentPage}
      count={count}
      color='primary'
      onChange={(_, page: number) => onChange(page)}
      size='large'
      renderItem={(item)=> <PaginationItem {...item} sx={defaultRestyling}/>}
    />
  )
}

export default Pagination