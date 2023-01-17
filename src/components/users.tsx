import React, { useState } from 'react';
import { Box, Button, Modal, TablePagination } from '@mui/material';
import { useGetUsers } from '../controllers/api-queries';
import UsersTable from './table/users-table';
import EditUserModal from './modal/edit-user-modal';
import { UserData, UsersData } from './types';
import { ToastContainer } from 'react-toastify';

function Users() {
  const [page, setPage] = useState<number>(1);
  const [editUser, setEditUser] = useState<UserData>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, isError, isLoading } = useGetUsers(page);

  const userLoadingField: UserData = {
    id: 0,
    firstName: 'loading...',
    lastName: 'loading...',
    email: 'loading...',
    avatar: 'https://unsplash-assets.imgix.net/empty-states/photos.png',
  };
  const arrayLoadingFields: Array<UserData | undefined> = [, , , , ,];
  const loadingFields = {
    data: arrayLoadingFields.fill(userLoadingField, 0, 5),
    page: 0,
    total: 0,
  };

  console.log(data, arrayLoadingFields.fill(userLoadingField, 0, 5));
  const usersData =
    data && !(Object.keys(data).length === 0)
      ? (data as UsersData)
      : isLoading
      ? loadingFields
      : undefined;

  function openModal(data: UserData): void {
    setEditUser(data);
    handleOpen();
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    // set request for page2
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));

    // refetch to page
    // setPage(0);
  };

  const columns = [
    {
      Header: 'Avatar',
      accessor: 'avatar',
      Cell: (tableProps: any) => (
        <div>
          <img
            src={tableProps.row.original.avatar}
            style={{ objectFit: 'fill', width: '100%', maxWidth: '150px' }}
            alt={`Profile picture for ${tableProps.row.original.firstName}`}
          />
        </div>
      ),
      Filter: '',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      Filter: '',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (tableProps: any) => (
        <Button
          variant="contained"
          onClick={() => {
            openModal(tableProps.row.original);
          }}
        >
          Edit Details
        </Button>
      ),
      Filter: '',
    },
  ];

  return (
    <div>
      {usersData && !isError ? (
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            marginY: '50px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <UsersTable
            columns={columns}
            data={usersData.data}
            rowsPerPage={rowsPerPage}
          />

          <TablePagination
            component="div"
            count={usersData.total}
            page={usersData.page}
            width={100}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 3, 5, 10]}
          />
        </Box>
      ) : (
        <div>ERROR LOADING API DATA</div>
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
  );
}

export default Users;
