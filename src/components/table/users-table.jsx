import React from 'react'
import { useFilters, useTable } from 'react-table'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { StyledTableCell } from './styles'

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
      type="search"
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} users...`}
      sx={{ marginTop: '10px' }}
    />
  )
}

// eslint-disable-next-line react/prop-types
function UsersTable ({ columns, data }) {
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
      <Table stickyHeader {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow
              sx={{ verticalAlign: 'top' }}
              key={i}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <StyledTableCell
                  align="center"
                  key={i}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                  <div>{column.render('Filter')}</div>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow
                sx={{ verticalAlign: 'center' }}
                key={i}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <StyledTableCell
                      align="center"
                      key={i}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </StyledTableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UsersTable
