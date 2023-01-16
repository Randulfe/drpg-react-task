import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { updateUserData } from '../../controllers/api-queries';
import { ModalContainer, UserDetailsContainer } from './styles';

function EditUserModal({ handleClose, userData }: any) {
  const [data, setData] = useState(userData);

  function handleChange(event: any) {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSave() {
    try {
      await updateUserData(data);
      // toast everything worked fine
    } catch (e) {
      // toast there was an issue
    }
  }

  return (
    <Box sx={ModalContainer}>
      <Typography
        pb={5}
        id="keep-mounted-modal-title"
        variant="h6"
        component="h2"
      >
        Edit User Details
      </Typography>
      <form>
        <Box sx={UserDetailsContainer}>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            name="firstName"
            type="text"
            defaultValue={data.firstName}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            name="lastName"
            type="text"
            defaultValue={data.lastName}
            sx={{ marginLeft: '10px' }}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            type="email"
            defaultValue={data.email}
            sx={{ width: '60%', marginLeft: '10px' }}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: '30px',
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Avatar"
            name="avatar"
            type="url"
            defaultValue={data.avatar}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <img src={data.avatar} />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button
            onClick={() => {
              handleSave();
              handleClose();
            }}
            variant="contained"
            sx={{ marginLeft: '10px' }}
          >
            SAVE
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditUserModal;
