import React from 'react'
import { useFilters, useTable } from 'react-table'
import { StyledTable, StyledTd, StyledTh, StyledTr } from './styles'
import { Box, TextField } from '@mui/material'

// FILTER UI
function DefaultColumnFilter ({
  // eslint-disable-next-line react/prop-types
  column: { filterValue, preFilteredRows, setFilter }
}) {
  // eslint-disable-next-line react/prop-types
  const count = preFilteredRows.length

  return (
    <TextField
      value={filterValue || ''}
      type='search'
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} users...`}
      sx={{ marginTop: '10px' }}
    />
  )
}

// eslint-disable-next-line react/prop-types
function UsersTable ({ columns, data, rowsPerPage }) {
  const filterTypes = () => ({
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true
      })
    }
  })

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )

  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes
      },
      useFilters
    )

  return (
    <Box sx={{ textAlign: 'center' }}>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <StyledTr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTh key={i} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.render('Filter')}</div>
                </StyledTh>
              ))}
            </StyledTr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <StyledTr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTd key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </StyledTd>
                  )
                })}
              </StyledTr>
            )
          })}
        </tbody>
      </StyledTable>
    </Box>
  )
}

export default UsersTable
