import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { updateUserData } from '../../controllers/api-queries'
import { UserData } from '../types'
import { ModalContainer, UserDetailsContainer } from './styles'
import { regexEmail, regexImageUrl } from '../constants'

function EditUserModal ({ handleClose, userData }: any) {
  const [data, setData] = useState<UserData>(userData)

  function handleChange (event: any) {
    const { name, value } = event.target

    setData({
      ...data,
      [name]: value
    })
  }

  async function handleSave () {
    try {
      await updateUserData(data)
      toast('User updated correctly', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'success'
      })
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
        type: 'error'
      })
    }
  }

  // would have used YUP library if I had some more time
  function onInvalidEmail (): boolean {
    return (data.email.length === 0)
      ? true
      : String(data.email).toLowerCase().match(regexEmail) == null
  }

  function onInvalidImageUrl (): boolean {
    return (data.avatar.length === 0)
      ? true
      : String(data.avatar).toLowerCase().match(regexImageUrl) == null
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
            error={data.firstName.length === 0}
            helperText={(data.firstName.length === 0) && 'First Name is required'}
            defaultValue={data.firstName}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            name="lastName"
            type="text"
            error={data.lastName.length === 0}
            helperText={(data.lastName.length === 0) && 'First Name is required'}
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
            paddingBottom: '30px'
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
              (data.firstName.length === 0) ||
              (data.lastName.length === 0) ||
              onInvalidImageUrl()
            }
            onClick={() => {
              void handleSave()
              handleClose()
            }}
          >
            SAVE
          </Button>
        </Box>
      </FormControl>
    </Box>
  )
}

export default EditUserModal
