import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Box, Button, Modal, TablePagination } from '@mui/material'
import { useGetUsers } from '../controllers/api-queries'
import UsersTable from './table/users-table'
import EditUserModal from './modal/edit-user-modal'
import { UserData, UsersData } from './types'
import { loadingFields } from './constants'

function Users () {
  const [page, setPage] = useState<number>(0)
  const [pageRequest, setPageRequest] = useState<number>(1)
  const [editUser, setEditUser] = useState<UserData>()
  const [open, setOpen] = useState<boolean>(false)
  const [rowsPerPage, setRowsPerPage] = useState<number>(6)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const { data, isError, isLoading } = useGetUsers(pageRequest)

  const usersData =
    (data != null) && !(Object.keys(data).length === 0)
      ? (data as UsersData)
      : isLoading
        ? loadingFields
        : undefined

  function openModal (data: UserData): void {
    setEditUser(data)
    handleOpen()
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
    setPageRequest(Math.floor((newPage * rowsPerPage) / 6) + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
  }

  const columns = [
    {
      Header: 'Avatar',
      accessor: 'avatar',
      Cell: (tableProps: any) => (
        <div>
          <img
            src={tableProps.row.original.avatar}
            style={{ objectFit: 'fill', width: '100%', maxWidth: '150px' }}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            alt={`Profile picture for ${tableProps.row.original.firstName}`}
          />
        </div>
      ),
      Filter: ''
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      Filter: ''
    },
    {
      Header: 'Last Name',
      accessor: 'lastName'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (tableProps: any) => (
        <Button
          variant="contained"
          onClick={() => {
            openModal(tableProps.row.original)
          }}
        >
          Edit Details
        </Button>
      ),
      Filter: ''
    }
  ]

  return (
    <div>
      {(usersData != null) && !isError
        ? (
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            marginY: '50px',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <UsersTable
            columns={columns}
            data={usersData.data.slice(
              page * rowsPerPage - 6 * (pageRequest - 1),
              page * rowsPerPage + rowsPerPage - 6 * (pageRequest - 1)
            )}
          />

          <TablePagination
            component="div"
            count={usersData.total}
            page={page}
            width={100}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 3, 6]}
          />
        </Box>
          )
        : (
        <div>WE ARE HAVING ISSUES GETTING OUR USERS 😞</div>
          )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bgcolor: 'rgba(200,200,200,0.6)' }}
      >
        <EditUserModal handleClose={handleClose} userData={editUser} />
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Users
