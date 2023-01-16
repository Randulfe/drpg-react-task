import React, { useState } from 'react';
import { Button, Modal, TablePagination } from '@mui/material';
import { useGetUsers } from '../controllers/api-queries';
import UsersTable from './table/users-table';
import EditUserModal from './modal/edit-user-modal';
import { UserData } from './types';

function Users() {
  const [page, setPage] = useState<number>(1);
  const [editUser, setEditUser] = useState<UserData>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, isError, isLoading } = useGetUsers(page);

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
          <img src={tableProps.row.original.avatar} />
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
      {isLoading ? (
        <div>LOADING...</div>
      ) : data && !isError ? (
        <div>
          <UsersTable
            columns={columns}
            data={data.data}
            rowsPerPage={rowsPerPage}
          />

          <TablePagination
            component="div"
            count={data.total}
            page={data.page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 3, 5, 10]}
          />
        </div>
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
    </div>
  );
}

export default Users;
