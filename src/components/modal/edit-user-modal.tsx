import React, { useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { updateUserData } from '../../controllers/api-queries';
import { ModalContainer, UserDetailsContainer } from './styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast('User updated correctly', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'success',
      });
    } catch (e) {
      toast('There was an issue updating the user. Please try later', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
  }

  // would have used YUP library if I had some more time
  function onInvalidEmail() {
    return !data.email
      ? true
      : String(data.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ? false
      : true;
  }

  function onInvalidImageUrl() {
    return !data.avatar
      ? true
      : String(data.avatar)
          .toLowerCase()
          .match(
            '^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*.(gif|jpe?g|png|webp)$',
          )
      ? false
      : true;
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
      <FormControl>
        <Box sx={UserDetailsContainer}>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            name="firstName"
            type="text"
            error={!data.firstName}
            helperText={!data.firstName && 'First Name is required'}
            defaultValue={data.firstName}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            name="lastName"
            type="text"
            error={!data.lastName}
            helperText={!data.lastName && 'First Name is required'}
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
            error={onInvalidEmail()}
            helperText={onInvalidEmail() && 'A valid email is required'}
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
            error={onInvalidImageUrl()}
            helperText={onInvalidImageUrl() && 'A valid image url is required'}
            defaultValue={data.avatar}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <img
            src={data.avatar}
            alt={`Image Edit avatar for ${data.firstName}`}
            style={{ maxWidth: '150px' }}
          />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginLeft: '10px' }}
            disabled={
              onInvalidEmail() ||
              !data.firstName ||
              !data.lastName ||
              onInvalidImageUrl()
            }
            onClick={() => {
              handleSave();
              handleClose();
            }}
          >
            SAVE
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default EditUserModal;
